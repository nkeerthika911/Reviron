const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController');
const { uploadProductPhotos } = require('../middleware/uploadHandler');

router.get('/',productController.getAllProductsController);
router.get('/:productId',productController.getProductByIdController);

router.post('/post',productController.postProductController);
router.post("/uploadphotos/:productid", uploadProductPhotos.array("productPhotos",10), productController.uploadProductPhotosController);  
router.patch("/favourite/:productid", productController.toggleFavoriteController);

module.exports = router;