const asyncHandler = require('express-async-handler');
const productService = require('../services/productService');
require("dotenv").config();
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

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
  const productid = req.params.productId;
  const product = await productService.getProductById(productid);

  if (!product) {
    throw Object.assign(new Error("Product not found!"), { statusCode: 404 });
  }

  const imageDir = path.join(__dirname, "..", "uploads", "productPhotos", productid);
  let imageUrls = [];

  if (fs.existsSync(imageDir)) {
    const files = fs.readdirSync(imageDir);
    imageUrls = files.map((file) => {
      return `${BASE_URL}/uploads/productPhotos/${productid}/${file}`;
    });
  }

  res.status(200).json({
    success: true,
    data: {
      message: "Product data fetched",
      data: {
        ...product.toObject?.() || product, // In case it's a Mongoose doc
        images: imageUrls
      }
    }
  });
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

//@desc Admin's Post a product picture
//@route /products/uploadphotos/:productid

const uploadProductPhotosController = async (req, res, next) => {
  try {
    const productid = req.params.productid;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const outputDir = path.join(__dirname, "..", "uploads", "productPhotos", productid);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const savedImagePaths = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const outputPath = path.join(outputDir, `${productid}-${i + 1}.png`);

      await sharp(file.buffer)
        .png()
        .toFile(outputPath);

      savedImagePaths.push(`uploads/productPhotos/${productid}/${productid}-${i + 1}.png`);
    }

    res.status(200).json({
      success: true,
      message: "Product photos uploaded and converted to PNG",
      data: {
        images: savedImagePaths,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getAllProductsController,
    getProductByIdController,
    postProductController,
    uploadProductPhotosController,
}