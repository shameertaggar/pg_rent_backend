const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Owner authentication routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Tenant authentication routes
router.post("/tenant/login", authController.tenantLogin);

module.exports = router;
