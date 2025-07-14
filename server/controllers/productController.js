const asyncHandler = require('express-async-handler');
const productService = require('../services/productService');

//@desc Get all Products
//@route /products

const getAllProductsController = asyncHandler(async (req, res) => {
    const products = await productService.getAllProducts();

    if (!products || products.length === 0) {
        throw Object.assign(new Error("No products fiund!"),{statusCode:404});
    }

     res.status(200).json({
        success: true,
        data:{
            message: "Products fetched",
            data: products
        }
    })
});

module.exports = {
    getAllProductsController,
}