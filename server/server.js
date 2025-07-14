const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dbConnect = require('./db/dbConnect');
const errorHandler=require('./middleware/errorHandler')
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require('./routes/authRoutes'));
app.use(errorHandler);
app.listen(PORT, () => {
    dbConnect.ConnectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
})