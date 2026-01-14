class Carts{
    static async findCartByProductIdAndUserId(product_id, user_id) {
        return await db.query("SELECT * FROM carts WHERE product_id = ? AND user_id = ?", [product_id, user_id])
    }

    static async deleteProductOnCart(product_id, user_id){
        return await db.query("DELETE FROM carts WHERE product_id = ? AND user_id = ?", [product_id, user_id])
    }

    static async insertProductOnCart(user_id, product_id){
        return await db.query("INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)", [user_id, product_id, 1])
    }

    static async addQuantityOnCart(user_id, product_id, quantity){
        return await db.query("UPDATE carts SET quantity = ? WHERE user_id = ? AND product_id = ?", [quantity, user_id, product_id])
    }

    static async findProductCartByUserId(user_id){
        return await db.query("SELECT carts.quantity, product_items.* FROM carts JOIN product_items ON carts.product_id = product_items.id WHERE user_id = ? ORDER BY carts.id DESC", [user_id])
    }

    static async getAmountByUserId(user_id){
        return await db.query("SELECT SUM(product_items.promo * carts.quantity) as amount FROM carts JOIN product_items ON carts.product_id = product_items.id WHERE user_id = ? ", [user_id])
    }
}

module.exports = Carts