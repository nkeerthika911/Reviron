const Product = require('../models/productModel');

//@desc Get all products
const getAllProducts = async()=>{
    const allProducts = await Product.find();
    return allProducts;
}

module.exports = {
    getAllProducts
}