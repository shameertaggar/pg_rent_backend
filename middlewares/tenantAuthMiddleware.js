const jwt = require("jsonwebtoken");
const { Constants: C } = require("../utils/constants");

const authenticateTenant = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, C.SECRET_KEY);
    
    // Check if this is a tenant token
    if (decoded.userType !== 'tenant') {
      return res.status(403).json({ error: "Access denied. Invalid token type." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authenticateTenant;
