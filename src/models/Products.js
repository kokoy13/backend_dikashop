const db = require("../../config/db")

class Products{
    static async getAllProductItem() {
        return await db.query("SELECT * FROM product_items ORDER BY id")
    }

    static async getProductByCategory(category){
        return await db.query("SELECT * FROM product_items WHERE category = ?", [category])
    }
}

module.exports = Products





