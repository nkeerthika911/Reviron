const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: true,
    },
    description: {
        type: String,
        default: "",
        required: true,
    },
    brand: {
        type: String,
        default: "",
        required: true,
    },
    condition: {
        type: String,
        enum: ["Working", "Not Working"],
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    category: {
        type: [String],
        default: [],
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
        required: true,
    },
});

module.exports = mongoose.model("Product", productSchema);