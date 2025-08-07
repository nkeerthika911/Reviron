const UserProduct = require('../models/userProductModel');

const addUserProduct = async (productData) => {
    const prodData = await UserProduct.create(productData);
    return prodData;
}

const getProductByOrderId = async (requestId) => {
    const prodData = await UserProduct.find({ requestId: requestId });
    return prodData;
};

const assignPriceToProduct = async (productId, startPrice, endPrice) => {
    const updatedProduct = await UserProduct.findByIdAndUpdate(
        productId,
        { startPrice, endPrice },
        { new: true } 
    );

    return updatedProduct;
};


module.exports = { addUserProduct, getProductByOrderId, assignPriceToProduct }