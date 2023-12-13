import { Op } from "sequelize";
import Product from "../models/Product.js";

export const viewProduct = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json({success: true, message:"Success to Fetch All Product Data", data:products});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:`${error}`});
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, stock, desc, basePrice, sellPrice, category, productImg } = req.body;

        if(stock < 0){
            return res.status(400).json({success: false, message: "Stock cant be set below zero"});
        }

        if(basePrice < 0){
            return res.status(400).json({success: false, message: "Base Price cant be set below zero"});
        }

        if(sellPrice < 0){
            return res.status(400).json({success: false, message: "Sell Price cant be set below zero"});
        }

        await Product.create({
            name,
            stock,
            desc,
            basePrice,
            sellPrice,
            category,
            productImg
        });

        return res.status(200).json({success: true, message: "A Product Successfully created"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:`${error}`});
    }
}

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, stock, desc, basePrice, sellPrice, category, productImg } = req.body;

        if(stock < 0){
            return res.status(400).json({success: false, message: "Stock cant be set below zero"});
        }

        if(basePrice < 0){
            return res.status(400).json({success: false, message: "Base Price cant be set below zero"});
        }

        if(sellPrice < 0 || sellPrice < basePrice){
            return res.status(400).json({success: false, message: "Sell Price cant be set below zero or below Base Price"});
        }

        await Product.update({
            name: name,
            stock: stock,
            desc: desc,
            basePrice: basePrice,
            sellPrice: sellPrice,
            category: category,
            productImg: productImg
        },{
            where:{
                productID: id
            }
        });

        return res.status(200).json({success :true, message: `A Product with ID : ${id} Successfully edited`});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:`${error}`});
    }
}

export const destroyProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await Product.destroy({
            where: {
                productID: id
            }
        });

        return res.status(200).json({success: true, message:`A Product with ID : ${id} Successfully deleted`});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:`${error}`});
    }
}

export const filterProduct = async (req, res) => {
    try {
        const search = req.query.search || "";
        const sortby = req.query.sortby || "name";
        const order = req.query.order || "ASC";

        const filteredProducts = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { stock: { [Op.like]: `%${search}%` } },
                    { desc: { [Op.like]: `%${search}%` } },
                    { sellPrice: { [Op.like]: `%${search}%` } },
                    { qtySold: { [Op.like]: `%${search}%` } },
                    { category: { [Op.like]: `%${search}%` } },
                ]
            },
            order: [
                [`${sortby}`, `${order}`]
            ],
        });

        return res.status(200).json({ success: true, message: "Successfully Filtered/Search Products", data: filteredProducts });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `${error}` });    
    }
};
