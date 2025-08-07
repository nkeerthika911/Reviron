const asyncHandler = require('express-async-handler');
const userService = require('../services/userService');
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

const getUserByIdController = asyncHandler(async (req, res) => {
  const userId = req.params.userid;
  const user = await userService.getUserbyUserId(userId);

  if (!user) {
    throw Object.assign(new Error("User not found!"), { statusCode: 404 });
  }

  const photoPath = path.join(__dirname, "..", "uploads", "profilePictures", `${userId}.png`);
  const profilePhoto = fs.existsSync(photoPath)
    ? `${BASE_URL}/uploads/profilePictures/${userId}.png`
    : null;
  res.status(200).json({
    success: true,
    data: {
      message: "User data fetched",
      data: {
        ...user.toObject?.() || user,
        profilePhoto,
      },
    },
  });
});


const editProfileController = asyncHandler(async (req, res) => {
  const userId = req.params.userid;
  const { phone, address } = req.body;

  if (!phone && !address) {
    throw Object.assign(new Error("Phone number or address is required"), { statusCode: 400 });
  }

  const updatedUser = await userService.editUserById(userId, { phone, address });

  if (!updatedUser) {
    throw Object.assign(new Error("User not found"), { statusCode: 404 });
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});


const uploadProfileController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const userid = req.params.userid;
    const outputDir = path.join(__dirname, "..", "uploads", "profilePictures");

    const outputPath = path.join(outputDir, `${userid}.png`);

    await sharp(req.file.buffer)
      .png()
      .toFile(outputPath);

    res.status(200).json({
      success: true,
      message: "Profile picture uploaded and converted to PNG",
      data: {
        imagePath: `uploads/profilePictures/${userid}.png`,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserByIdController, uploadProfileController, editProfileController }