const Users = require("../models/Users")
const Carts = require("../models/Carts")

exports.addProductToCart = async(req, res) =>{
    const {email ,product_id} = req.body;
    try {
        if(email.length === 0){
            return res.status(400).json({
                message: "email is required"
            })
        }

        const isEmailExist = await Users.findUserByEmail(email);
        if(isEmailExist[0].length === 0){
            return res.status(400).json({
                message: "email not found, make sure you login before add product to cart"
            })
        }
        const user_id = isEmailExist[0][0].id
        const isProductIdExist = await Carts.findCartByProductIdAndUserId(product_id, user_id)
        if(isProductIdExist[0].length === 0){
            await Carts.insertProductOnCart(user_id, product_id)
        }else{
            const quantity = isProductIdExist[0][0].quantity + 1
            await Carts.addQuantityOnCart(user_id, product_id, quantity)
        }
        
        return res.status(200).json({
            message: "Successfully add to cart"
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${err}`
        });
    }
}

exports.getAllCartByEmail = async(req, res) =>{
    const {email} = req.query;
    try {
        if(email.length === 0){
            return res.status(400).json({
                message: "email is required"
            })
        }

        const isEmailExist = await Users.findUserByEmail(email);
        if(isEmailExist[0].length === 0){
            return res.status(400).json({
                message: "email not found, make sure you login before add product to cart"
            })
        }
        const user_id = isEmailExist[0][0].id

        const amount = await Carts.getAmountByUserId(user_id)
        const carts = await Carts.findProductCartByUserId(user_id)
        return res.status(200).json({
            carts: carts[0],
            amount: amount[0]
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error}`
        });
    }
}

exports.updateQuantity = async(req, res) =>{
    const {email, product_id, type} = req.body
    try {
        if(email.length === 0){
            return res.status(400).json({
                message: "email is required"
            })
        }

        const isEmailExist = await Users.findUserByEmail(email);
        if(isEmailExist[0].length === 0){
            return res.status(400).json({
                message: "email not found, make sure you login before add product to cart"
            })
        }
        const user_id = isEmailExist[0][0].id
        const isProductIdExist = await Carts.findCartByProductIdAndUserId(product_id, user_id)
        if(isProductIdExist[0][0].quantity === 1 && type === 'minus'){
            await Carts.deleteProductOnCart(product_id, user_id)
        }else if(isProductIdExist[0][0].quantity > 1 && type === 'minus'){
            const quantity = isProductIdExist[0][0].quantity - 1
            await Carts.addQuantityOnCart(user_id, product_id, quantity)
        }else{
            const quantity = isProductIdExist[0][0].quantity + 1
            await Carts.addQuantityOnCart(user_id, product_id, quantity)
        }
        
        return res.status(200).json({
            message: "Successfully add to cart"
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${err}`
        });
    }
}