const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    gender:{
        type: String,
        required: true,
        enum:["m","f"]
    },
    profilePic:{
        type: String,
        default: "",
    },
    role:{
        type: String,
        default: "user",
    },

    // createdAt, updatedAt field will be added due to timestamps
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);