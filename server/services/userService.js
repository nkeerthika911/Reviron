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
//editprofile in profile cardaa
const editUserById = async (userId, updateFields) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      ...(updateFields.phone && { phone: updateFields.phone }),
      ...(updateFields.address && { address: updateFields.address }),
    },
    { new: true, select: "-password -createdAt -updatedAt -__v" }
  );
  return user;
};


module.exports = { getUserbyEmail, getUserbyUserId,editUserById }