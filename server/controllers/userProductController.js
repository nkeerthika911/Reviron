const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const userProductService = require('../services/userProductService');
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const addUserProductController = asyncHandler(async (req, res) => {
    const collectionData = await userProductService.addUserProduct(req.body);

    if (!collectionData) {
        throw Object.assign(new Error("Failed to add user product!"), { statusCode: 400 });
    }

    res.status(201).json({
        success: true,
        data: {
            message: "User product created successfully",
            data: collectionData
        }
    });
});

const getProductByOrderId = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
        const requestId = new mongoose.Types.ObjectId(orderId);
    const productList = await userProductService.getProductByOrderId(requestId);
    if(!productList){
        throw Object.assign(new Error("No Products Available"), { statusCode: 400 });
    }
    res.status(201).json({
        success: true,
        data: productList,
    });

});

const uploadUserProductController = async (req, res, next) => {
    try {
        const productId = req.params.productid;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }

        const outputDir = path.join(__dirname, "..", "uploads", "userProductPhotos", productId);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const savedImagePaths = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const outputPath = path.join(outputDir, `${productId}-${i + 1}.png`);

            await sharp(file.buffer)
                .png()
                .toFile(outputPath);

            savedImagePaths.push(`uploads/userProductPhotos/${productId}/${productId}-${i + 1}.png`);
        }

        res.status(200).json({
            success: true,
            message: "User product photos uploaded and converted to PNG",
            data: {
                images: savedImagePaths,
            },
        });
    } catch (err) {
        next(err);
    }
};

const assignPriceController = asyncHandler(async (req, res) => {
    const { productId, startPrice, endPrice } = req.body;

    if (!productId || startPrice == null || endPrice == null) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const updatedProduct = await userProductService.assignPriceToProduct(productId, startPrice, endPrice);

    if (!updatedProduct) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.status(200).json({
        success: true,
        message: "Price assigned successfully",
        data: updatedProduct,
    });
});




module.exports = {
    addUserProductController, 
    uploadUserProductController,
    getProductByOrderId, assignPriceController,
}