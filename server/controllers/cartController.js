const asyncHandler = require('express-async-handler');
const cartService = require('../services/cartService');

// @desc Get all products in a user's cart
// @route GET /:userId
const getCartItemsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const cartItems = await cartService.getCartItemsByUserId(userId);
  res.status(200).json(cartItems);
});

// @desc Add product to cart
// @route POST /
const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const item = await cartService.addToCart(userId, productId, quantity);
  res.status(201).json(item);
});

// @desc Remove product from cart
// @route DELETE /:userId/:productId
const removeFromCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;
  await cartService.removeFromCart(userId, productId);
  res.status(200).json({ message: 'Item removed from cart' });
});

module.exports = {
  getCartItemsByUserId,
  addToCart,
  removeFromCart,
};
