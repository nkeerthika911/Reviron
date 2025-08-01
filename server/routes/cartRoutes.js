const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.get('/:userId', cartController.getCartItemsByUserId);
router.post('/add', cartController.addToCart);
router.delete('/delete/:userId/:productId', cartController.removeFromCart); 

module.exports = router;
