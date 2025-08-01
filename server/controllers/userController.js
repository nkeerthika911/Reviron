const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const userService = require('../services/userService');
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

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

module.exports = {uploadProfileController}