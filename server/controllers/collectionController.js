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

const getAllCollectionData = asyncHandler(async(req,res) => {
    const collection = await collectionService.getAllCollectionData();
    if(!collection){
        throw Object.assign(new Error("Failed to create collection request!"), { statusCode: 400 });
    }
    res.status(201).json({
        success: true,
        data:{
            message: "Collection request created successfully",
            data: collection,
        }
    });
});

const getCollectionDataByUserIdController = asyncHandler(async (req, res) => {
    let collections = await collectionService.getCollectionDataByUserId(req.params.userid);

    if (!collections) {
        throw Object.assign(new Error("Failed to fetch collection requests!"), { statusCode: 400 });
    }

    const statusOrder = {
        'pickup initiated': 0,
        'processing': 1,
        'collected': 2,
    };

    collections.sort((a, b) => {
        return statusOrder[a.collectionStatus] - statusOrder[b.collectionStatus];
    });

    res.status(200).json({
        success: true,
        data: {
            message: "Collection requests fetched successfully",
            data: collections,
        }
    });
});




module.exports = {
    addCollectionRequestController,
    getAllCollectionData,
    getCollectionDataByUserIdController,
}