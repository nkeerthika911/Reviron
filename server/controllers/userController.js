const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const { getUserbyUserId } = require("../services/userService");

const getUserByIdController = asyncHandler(async (req, res) => {
    const userId = req.user;

    const user = await getUserbyUserId(userId);

    if (!user) {
        throw Object.assign(new Error("User not found!"), { statusCode: 404 });
    }

    const photoPath = path.join(__dirname, "..", "uploads", "profilePictures", `${userId}.png`);
    const profilePhoto = fs.existsSync(photoPath)
        ? `${process.env.BASE_URL}/uploads/userPhotos/${userId}.png`
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

module.exports = {getUserByIdController, uploadProfileController}