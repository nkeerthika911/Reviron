const User = require('../models/userModel');

//@desc create a new user
const signup = async(userData)=>{
    const newUser=await User.create(userData);
    return newUser;
}


module.exports={signup,}