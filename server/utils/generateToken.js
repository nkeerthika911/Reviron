// const jwt = require('jsonwebtoken');
// require('dotenv').config()

// const generateToken = (userId, res) => {
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' })
//     res.cookie("jwt", token, {
//         maxAge: 15 * 24 * 60 * 60 * 1000, //ms format
//         // httpOnly: true, //prevent XSS attacks cross-site scripting attacks
//         sameSite: "strict", //CSRF attacks cross-site request forgery attacks
//         secure: process.env.NODE_ENV !== "development",
//     });
// }

// module.exports={generateToken};

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: false,                 // <-- allow frontend to read cookie
    sameSite: "lax",                 // protects from CSRF
    secure: false,                   // must be false on localhost (no HTTPS)
    path: "/",                       // optional but useful
  });
  return token;
};

module.exports = { generateToken };

