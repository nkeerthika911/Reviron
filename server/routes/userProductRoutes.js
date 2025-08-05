const express = require('express')
const router=express.Router();
const userProductController = require('../controllers/userProductController')

router.post("/add", userProductController.addUserProductController);

module.exports = router;    