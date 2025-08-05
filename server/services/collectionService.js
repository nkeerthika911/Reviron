const Collection = require('../models/collectionModel');

const addCollectionRequest = async (collectionData) => {
    const requestData = await Collection.create(collectionData);
    return requestData;
}

module.exports = {addCollectionRequest,}