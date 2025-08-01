const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const userService = require('../services/userService');

const uploadProfileController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const userId = req.params.userId;
    const outputDir = path.join(__dirname, "..", "uploads", "profilePictures");

    const outputPath = path.join(outputDir, `${userId}.png`);

    await sharp(req.file.buffer)
      .png()
      .toFile(outputPath);

    res.status(200).json({
      success: true,
      message: "Profile picture uploaded and converted to PNG",
      data: {
        imagePath: `uploads/profilePictures/${userId}.png`,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {uploadProfileController}