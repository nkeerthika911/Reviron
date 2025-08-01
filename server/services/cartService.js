const Cart = require('../models/cartModel');

// Get all cart items for a user
const getCartItemsByUserId = async (userId) => {
  return await Cart.find({ userId }).populate('productId').exec();
};

// Add item to cart (if exists, update quantity)
const addToCart = async (userId, productId, quantity = 1) => {
  const existingItem = await Cart.findOne({ userId, productId });

  if (existingItem) {
    existingItem.quantity += quantity;
    return await existingItem.save();
  } else {
    const newItem = new Cart({ userId, productId, quantity });
    return await newItem.save();
  }
};

// Remove item from cart
const removeFromCart = async (userId, productId) => {
  await Cart.findOneAndDelete({ userId, productId });
};

module.exports = {
  getCartItemsByUserId,
  addToCart,
  removeFromCart,
};
