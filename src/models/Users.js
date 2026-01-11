const db = require("../../config/db")

class Users{
    static async findUserByEmail(email) {
        return await db.query("SELECT email, password FROM users WHERE email = ?", [email])
    }

    static async createUser(full_name, email, password){
        return await db.query("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)", [full_name, email, password])
    }
}

module.exports = Users





