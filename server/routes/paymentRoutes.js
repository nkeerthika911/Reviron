const express = require('express');
const router = express.Router();
const { createOrderAndInitiatePayment } = require('../controllers/paymentController');


module.exports = router;
