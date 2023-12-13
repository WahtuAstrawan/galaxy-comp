import DetailTransaction from "../models/DetailTransaction.js";
import Transaction from "../models/Transaction.js";
import Product from "../models/Product.js";

export const viewTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [{model: DetailTransaction}],
        });
        return res.status(200).json({success: true, message:"Success to Fetch All Transactions Data", data:transactions});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:`${error}`});
    }
}

export const addTransaction = async (req, res) => {
    try {
        const { customerName, totalPrice, payMethod, totalPay, changes, employeeID, details } = req.body;
        

        if(totalPrice > totalPay){
            return res.status(400).json({success: false, message: "Total Pay can not set below the Total Price"});
        }

        const addedTransaction = await Transaction.create({
            customerName,
            totalPrice,
            payMethod,
            totalPay,
            changes,
            employeeEmployeeID: employeeID
        });

        for(let detail of details){
            await DetailTransaction.create({
                buyQty: detail.buyQty,
                subTotal: detail.subTotal,
                transactionTransactionID: addedTransaction.transactionID,
                productProductID: detail.productID
            })

            const updatedProduct = await Product.findByPk(detail.productID);
            await updatedProduct.update({
                stock: updatedProduct.stock - detail.buyQty,
                qtySold: updatedProduct.qtySold + detail.buyQty
            });
        }

        return res.status(200).json({success: true, message: "A Transaction Successfully created"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:`${error}`});
    }
}

export const destroyTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        await DetailTransaction.destroy({where: {
            transactionTransactionID: id
        }});

        await Transaction.destroy({where: {
            transactionID: id
        }});

        return res.status(200).json({success: true, message:`A Transaction with ID : ${id} Successfully deleted`});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:`${error}`});
    }
}

export const filterTransaction = async (req, res) => {
    try {
        const search = req.query.search || "";
        const sortby = req.query.sortby || "transactionDate";
        const order = req.query.order || "ASC";

        const filteredTransactions = await Transaction.findAll({
            where: {
                [Op.or]: [
                    { transactionDate: { [Op.like]: `%${search}%` } },
                    { customerName: { [Op.like]: `%${search}%` } },
                    { totalPrice: { [Op.like]: `%${search}%` } },
                    { payMethod: { [Op.like]: `%${search}%` } },
                    { totalPay: { [Op.like]: `%${search}%` } },
                    { changes: { [Op.like]: `%${search}%` } },
                ]
            },
            order: [
                [`${sortby}`, `${order}`]
            ],
            include: [{model: DetailTransaction}],
        });

        return res.status(200).json({ success: true, message: "Successfully Filtered/Search Transactions", data: filteredTransactions });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `${error}` });    
    }
};