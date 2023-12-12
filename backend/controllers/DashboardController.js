import Product from "../models/Product.js";

export const viewTrend = async (req, res) => {
    try {
        const trendProducts = await Product.findAll({
            order: [
                ['qtySold', 'DESC']
            ],
            limit: 10
        })

        return res.status(200).json({success: true, message: "Successfully fetch trend Products Data", data:trendProducts});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message:`${error}`});
    }
}