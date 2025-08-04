const asyncHandler = require('express-async-handler');
const userProductService = require('../services/userProductService');

const addUserProductController = asyncHandler(async (req, res) => {
    const collectionData = await collectionService.addUserProductController(req.body);

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

module.exports = {
    addUserProductController,

}