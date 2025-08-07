const Order = require('../models/Order');
const { createCashfreeOrder } = require('../services/cashfreeService');

const createOrderAndInitiatePayment = async (req, res) => {
  try {
    const { userId, orderAmount, address, phone } = req.body;

    // Step 1: Create order in MongoDB
    const newOrder = await Order.create({
      userId,
      orderAmount,
      address,
      phone,
    });

    // Step 2: Call Cashfree to create payment order
    const orderId = `ORDER_${newOrder._id}`; // unique order ID for Cashfree

    const paymentData = await createCashfreeOrder({
      orderId,
      amount: orderAmount,
    });

    // Step 3: Return payment session data to frontend
    res.status(201).json({
      success: true,
      orderId: newOrder._id,
      cashfree: {
        orderId: paymentData.order_id,
        orderToken: paymentData.order_token,
        paymentLink: paymentData.payment_link,
      },
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

module.exports = { createOrderAndInitiatePayment };
