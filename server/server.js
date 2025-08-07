const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dbConnect = require('./db/dbConnect');
const errorHandler = require('./middleware/errorHandler');
const path = require("path");

const app = express();
const PORT = process.env.PORT;
app.use(cors({
  origin: ['http://localhost:5173', 'https://reviron.vercel.app', 'https://www.reviron.in/'],
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/products", require('./routes/productRoutes'));
app.use("/api/user", require('./routes/userRoutes'));
app.use("/api/cart", require('./routes/cartRoutes'));
app.use("/api/userproduct", require('./routes/userProductRoutes'));
app.use("/api/collection", require('./routes/collectionRoutes'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.use(errorHandler);

app.listen(PORT, () => {
  dbConnect.ConnectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
