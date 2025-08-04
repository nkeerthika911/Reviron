const express = require('express')
const router=express.Router();
const collectionController = require('../controllers/collectionController')

router.post("/addrequest", collectionController.addCollectionRequestController);

module.exports = router;    