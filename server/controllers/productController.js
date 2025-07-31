const asyncHandler = require('express-async-handler');
const productService = require('../services/productService');

//@desc Get all Products
//@route /products

const getAllProductsController = asyncHandler(async (req, res) => {
    const products = await productService.getAllProducts();

    if (!products || products.length === 0) {
        throw Object.assign(new Error("No products found!"),{statusCode:404});
    }

     res.status(200).json({
        success: true,
        data:{
            message: "Products fetched",
            data: products
        }
    })
});

//@desc Get a product by productId
//@route /products/:productId

const getProductByIdController = asyncHandler(async (req, res) => {
    const product = await productService.getProductById(req.params.productId);

    if (!product) {
        throw Object.assign(new Error("Product not found!"), {statusCode:404});
    }

     res.status(200).json({
        success: true,
        data:{
            message: "Product data fetched",
            data: product
        }
    })
});

//@desc Admin's Post a product
//@route /products/post

const postProductController = asyncHandler(async (req, res) => {
    const newProduct = await productService.postProduct(req.body);

    if (!newProduct) {
        throw Object.assign(new Error("Failed to create product!"), { statusCode: 400 });
    }

    res.status(201).json({
        success: true,
        data: {
            message: "Product created successfully",
            data: newProduct
        }
    });
});

module.exports = {
    getAllProductsController,
    getProductByIdController,
    postProductController,
}