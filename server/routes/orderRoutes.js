const express = require('express');
const router = express.Router();
const { createOrderAndInitiatePayment } = require('../controllers/orderController');

router.post('/create', createOrderAndInitiatePayment);

module.exports = router;
