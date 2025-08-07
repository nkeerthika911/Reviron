const express = require('express')
const router=express.Router();
const userProductController = require('../controllers/userProductController')
const { uploadUserProductPhotos } = require('../middleware/uploadHandler');

router.post("/add", userProductController.addUserProductController);
router.post("/uploadphotos/:productid", uploadUserProductPhotos.array("userProductPhotos",4), userProductController.uploadUserProductController);  
router.get("/:orderId",userProductController.getProductByOrderId);
router.patch('/assignprice', userProductController.assignPriceController);

module.exports = router;    