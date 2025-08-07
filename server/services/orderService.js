const Order = require('../models/orderModel');
const { createCashfreeOrder } = require('./cashFreeService');

const handleOrderAndPayment = async ({ userId, orderAmount, address, phone }) => {
  // Step 1: Create MongoDB order
  const newOrder = await Order.create({
    userId,
    orderAmount,
    address,
    phone,
  });

  // Step 2: Create Cashfree order
  const orderId = `ORDER_${newOrder._id}`; // unique string for Cashfree

  const paymentData = await createCashfreeOrder({
    orderId,
    amount: orderAmount,
  });

  return {
    orderId: newOrder._id,
    cashfree: {
      orderId: paymentData.order_id,
      orderToken: paymentData.order_token,
      paymentLink: paymentData.payment_link,
    },
  };
};

module.exports = { handleOrderAndPayment };
