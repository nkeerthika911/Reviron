const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userService = require('../services/userService');
require("dotenv").config();

const protectRoute = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        throw Object.assign(new Error("Token not provided! Kindly Login!"), { statusCode: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        throw Object.assign(new Error("Invalid Token"), { statusCode: 401 });
    }
    const user = await userService.getUserbyUserId(decoded.userId);
    if (!user) {
        throw Object.assign(new Error("User not found"), { statusCode: 404 });
    }
    if (user.password) {
        delete user.password;
    }
    req.user = user;
    next();
});

module.exports = { protectRoute };
