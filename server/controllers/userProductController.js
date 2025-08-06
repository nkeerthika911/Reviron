const asyncHandler = require('express-async-handler');
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

module.exports = {
    addUserProductController, uploadUserProductController

}