import Product from "../models/Product.js";
import DetailTransaction from "../models/DetailTransaction.js";
import { Op } from "sequelize";

export const viewTrend = async (req, res) => {
    try {
        const page = req.query.page || 1;

        const trendProducts = await Product.findAll({
            order: [
                ['qtySold', 'DESC']
            ],
            offset: 10 * (parseInt(page) - 1),
            limit: 10
        });

        return res.status(200).json({success: true, message: "Successfully fetch trend Products Data", data:trendProducts});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:`${error}`});
    }
}

export const viewIncome = async (req, res) => {
    try {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const transactions = await DetailTransaction.findAll({
            where: {
                createdAt: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth],
                },
            },
        });

        let totalGrossIncome = 0;
        let totalNetIncome = 0;

        for (const transaction of transactions) {
            totalGrossIncome += transaction.subTotal;
            const product = await Product.findByPk(transaction.productProductID);
            totalNetIncome += transaction.subTotal - (product.basePrice * transaction.buyQty);
        }

        return res.status(200).json({
            success: true,
            message: "Successfully fetched income data",
            data: {
                totalGrossIncome,
                totalNetIncome,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:`${error}`});
    }
}