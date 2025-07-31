const Product = require('../models/productModel');

//@desc Get all products
const getAllProducts = async()=>{
    const allProducts = await Product.find();
    return allProducts;
}

//@desc Get a product by productId
const getProductById = async(productId)=>{
    const product = await Product.findById(productId);
    return product;
}

//@desc Post a product 
const postProduct = async(productData)=>{
    const newProduct = await Product.create(productData);
    return newProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
}