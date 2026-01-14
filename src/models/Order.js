class Order {
    constructor({ orderId, amount, customer }) {
        this.orderId = orderId;
        this.amount = amount;
        this.customer = customer;
        this.status = 'pending';
    }
}

module.exports = Order;
