const express = require('express')
const router=express.Router();
const userController = require('../controllers/userController')
const { uploadProfile } = require("../middleware/uploadHandler");
const protectRoute  = require('../middleware/protectRoute');

router.get("/details/:userid", protectRoute, userController.getUserByIdController);
router.post("/uploadprofile/:userid", uploadProfile.single("profilePicture"), userController.uploadProfileController);

module.exports = router;    