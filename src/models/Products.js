const db = require("../../config/db")

class Products{
    static async getAllProductItem() {
        return await db.query("SELECT * FROM product_items ORDER BY id")
    }
}

module.exports = Products





