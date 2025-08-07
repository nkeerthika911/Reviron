const asyncHandler = require('express-async-handler');
const orderService = require('../services/orderService');

const createOrderAndInitiatePayment = async (req, res) => {
  try {
    const { userId, orderAmount, address, phone } = req.body;

    const result = await orderService.handleOrderAndPayment({ userId, orderAmount, address, phone });

    res.status(201).json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

module.exports = { createOrderAndInitiatePayment };
