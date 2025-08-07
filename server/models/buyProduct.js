const mongoose = require('mongoose');

const buyProductSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("BuyProduct", buyProductSchema);