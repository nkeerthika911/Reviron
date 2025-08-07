const UserProduct = require('../models/userProductModel');

const addUserProduct = async (productData) => {
    const prodData = await UserProduct.create(productData);
    return prodData;
}

const getProductByOrderId = async (requestId) => {
    const prodData = await UserProduct.find({ requestId: requestId });
    return prodData;
};


module.exports = { addUserProduct, getProductByOrderId }