const Collection = require('../models/collectionModel');

const addCollectionRequest = async (collectionData) => {
    const requestData = await Collection.create(collectionData);
    return requestData;
}

const getAllCollectionData = async () => {
    const collection = await Collection.find().populate('userId');
    return collection;
}

module.exports = { addCollectionRequest, getAllCollectionData };