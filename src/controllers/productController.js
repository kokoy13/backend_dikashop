const Products = require("../models/Products")

exports.getAllProductItem = async (req, res) => {
    try {
        const products = await Products.getAllProductItem()
        return res.status(200).json({
            products: products[0]
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error}`
        })
    }
};