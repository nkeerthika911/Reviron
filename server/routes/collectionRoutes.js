const express = require('express')
const router=express.Router();
const collectionController = require('../controllers/collectionController')

router.post("/addrequest", collectionController.addCollectionRequestController);
router.get("/all", collectionController.getAllCollectionData);
router.get("/:userid",collectionController.getCollectionDataByUserIdController);

module.exports = router;    