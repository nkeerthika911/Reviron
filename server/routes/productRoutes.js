const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()

router.get('/',productController.getAllProductsController);
router.get('/:productId',productController.getProductByIdController);

module.exports = router;