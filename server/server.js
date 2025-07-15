const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dbConnect = require('./db/dbConnect');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/products", require('./routes/productRoutes'));

app.use(errorHandler);

app.listen(PORT, () => {
  dbConnect.ConnectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
