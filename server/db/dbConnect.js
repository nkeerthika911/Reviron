const mongoose = require('mongoose')

const ConnectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error Connecting to the Database: ",error.message);
    }
}

module.exports={ConnectToMongoDB,}