const asyncHandler = require('express-async-handler');
const collectionService = require('../services/collectionService');

const addCollectionRequestController = asyncHandler(async (req, res) => {
    const collectionData = await collectionService.addCollectionRequest(req.body);

    if (!collectionData) {
        throw Object.assign(new Error("Failed to create collection request!"), { statusCode: 400 });
    }

    res.status(201).json({
        success: true,
        data: {
            message: "Collection request created successfully",
            data: collectionData
        }
    });
});

module.exports = {
    addCollectionRequestController,

}