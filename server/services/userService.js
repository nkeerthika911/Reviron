const User = require('../models/userModel');

//@desc get a userDetails by username
const getUserbyEmail = async (email) => {
    const userData = await User.findOne({ email: { $eq: email } });
    return userData;
}
//@desc get a userDetails by userId 
const getUserbyUserId = async (userId) => {
    const userData = await User.findById(userId,{password: 0, createdAt: 0, updatedAt: 0, __v: 0});
    return userData;
}

module.exports = { getUserbyEmail, getUserbyUserId }