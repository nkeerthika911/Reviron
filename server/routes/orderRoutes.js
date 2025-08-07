const express = require('express');
const router = express.Router();
const { createOrderAndInitiatePayment } = require('../controllers/orderController');

// @route   POST /api/orders/create
// @desc    Create order in DB and initiate Cashfree payment
// @access  Public or Protected (your choice)
router.post('/create', createOrderAndInitiatePayment);

module.exports = router;
