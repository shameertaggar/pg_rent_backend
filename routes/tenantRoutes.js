const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const tenantController = require("../controllers/tenantController");

// Apply middleware to tenant routes
router.post("/", authenticateJWT, tenantController.createTenant);
router.get("/", authenticateJWT, tenantController.getAllTenants);
router.get("/:id", authenticateJWT, tenantController.getTenantById);
router.put("/:id", authenticateJWT, tenantController.updateTenant);
router.delete("/:id", authenticateJWT, tenantController.deleteTenant);

module.exports = router;