const mongoose = require('mongoose');

const userProductSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: true,
    },
    category: {
        type: String,
        default: "",
        required: true,
    },
    condition: {
        type: String,
        enum: ["Working", "Not Working"],
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    description: {
        type: String,
        default: "",
        required: true,
    },
    startPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    endPrice: {
        type: Number,
        default: 0,
        required: true,
    },
});

module.exports = mongoose.model("UserProduct", userProductSchema);