// /services/cashfreeService.js
const axios = require('axios');

const createCashfreeOrder = async ({ orderId, amount, userId }) => {
  try {
    const response = await axios.post(
      `${process.env.CASHFREE_BASE_URL}/orders`,
      {
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: orderId, // minimum required field
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-version': '2022-09-01',
          'x-client-id': process.env.CASHFREE_CLIENT_ID,
          'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Cashfree order error:', error.response?.data || error.message);
    throw new Error('Failed to create Cashfree order');
  }
};

module.exports = { createCashfreeOrder };
