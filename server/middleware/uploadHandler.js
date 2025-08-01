const multer = require("multer")
const path = require("path");

// profilePicture
const profileFileFilter=(req,file,cb) => {
    const allowedTypes= /jpeg|jpg|png|gif/;
    const isAllowed  = allowedTypes.test(file.mimetype);
    if(isAllowed){
        cb(null,true);
    }
    else{
        cb(Object.assign(new Error("Ivalid file type!"), { statusCode: 400 }),false);
    }
};

const uploadProfile = multer({
    storage: multer.memoryStorage(),
    fileFilter: profileFileFilter,
})

//Product Photos
const productFileFilter=(req,file,cb) => {
    const allowedTypes= /jpeg|jpg|png|gif/;
    const isAllowed  = allowedTypes.test(file.mimetype);
    if(isAllowed){
        cb(null,true);
    }
    else{
        cb(Object.assign(new Error("Ivalid file type!"), { statusCode: 400 }),false);
    }
};

const uploadProductPhotos = multer({
    storage: multer.memoryStorage(),
    fileFilter: productFileFilter,
})


module.exports = {uploadProfile, uploadProductPhotos};