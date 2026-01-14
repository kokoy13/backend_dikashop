const snap = require('../config/midtrans');
const Order = require('../models/orderModel');
const User = require('../models/Users');

exports.createPayment = async (req, res) => {
    try {
        const { amount, email } = req.body;

        const orderId = `ORDER-${Date.now()}`;
        const user = await User.findUserByEmail(email)
        const name = user[0][0].full_name

        const order = new Order({
            orderId,
            amount,
            customer: { name, email }
        });

        const parameter = {
        transaction_details: {
            order_id: order.orderId,
            gross_amount: order.amount,
        },
        customer_details: {
            first_name: order.customer.name,
            email: order.customer.email,
        },
        };

        const snapResponse = await snap.createTransaction(parameter);

        return res.json({
            success: true,
            snap_url: snapResponse.redirect_url,
            token: snapResponse.token
        });

    } catch (error) {
            console.error(error);
            res.status(500).json({
            success: false,
            message: 'Payment creation failed'
        });
    }
};
