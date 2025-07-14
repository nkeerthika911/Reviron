const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const authService = require('../services/authService');
const userService = require('../services/userService');
const { generateToken } = require('../utils/generateToken');


//@desc Login
//@route /api/auth/login
const login = asyncHandler(async (req, res) => {
    const userDetails = await userService.getUserbyEmail(req.body.email);
    console.log(userDetails)
    if(!userDetails){
        throw Object.assign(new Error("User doesn't exist"),{statusCode:400});
    }
    if(! await bcryptjs.compare(req.body.password, userDetails.password)){ // unhashed to be compared with hashed
        throw Object.assign(new Error("Wrong Password"),{statusCode:400});
    }
    //GENERATE JWT TOKEN
    await generateToken(userDetails._id,res);
    res.status(200).json({
        success: true,
        data:{
            message:"Login Successful",
        }
    })
})

//@desc get a userDetails by username
//@route /api/auth/signup
const signup = asyncHandler(async (req, res) => {
    const user = await userService.getUserbyEmail(req.body.email);
    console.log(req.body);
    if (user) {
        throw Object.assign(new Error("Email already Registered"), { statusCode: 409 });
    }

    // HASH PASSWORD HERE
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    // PROFILE PICTURE - https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${req.body.fullName}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${req.body.fullName}`
    const newUser = await authService.signup({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
        profilePic: req.body.gender == "m" ? boyProfilePic : girlProfilePic,
    });
    //GENERATE JWT TOKEN
    await generateToken(newUser._id,res);

    res.status(201).json({
        success: true,
        data: {
            message: "User created successfully",
        }
    })
})

const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({
        success: true,
        data:{
            message: "Logged out successfully"
        }
    })
})

module.exports = { login, signup, logout }