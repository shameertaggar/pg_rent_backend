const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET; // Store this securely


const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" }); // or customize expiration
};


const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
