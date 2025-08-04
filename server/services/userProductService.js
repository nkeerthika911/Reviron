const UserProduct = require('../models/userProductModel');

const addUserProduct = async (productData) => {
    const prodData = await UserProduct.create(productData);
    return prodData;
}

module.exports = {addUserProduct,}