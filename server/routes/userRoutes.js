const express = require('express')
const router=express.Router();
const userController = require('../controllers/userController')
const { uploadProfile } = require("../middlewares/uploadHandler");

router.post("/uploadprofile/:userId", uploadProfile.single("profilePicture"), userController.uploadProfileController);