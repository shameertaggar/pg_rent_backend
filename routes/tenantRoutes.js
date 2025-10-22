const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const authenticateTenant = require("../middlewares/tenantAuthMiddleware");
const tenantController = require("../controllers/tenantController");

// Owner routes (require owner authentication)
router.post("/", authenticateJWT, tenantController.createTenant);
router.get("/", authenticateJWT, tenantController.getAllTenants);
router.get("/:id", authenticateJWT, tenantController.getTenantById);
router.put("/:id", authenticateJWT, tenantController.updateTenant);
router.delete("/:id", authenticateJWT, tenantController.deleteTenant);

// Tenant portal routes (require tenant authentication)
router.get("/portal/profile", authenticateTenant, tenantController.getMyProfile);
router.get("/portal/rent-history", authenticateTenant, tenantController.getMyRentHistory);
router.get("/portal/complaints", authenticateTenant, tenantController.getMyComplaints);
router.put("/portal/checkout-date", authenticateTenant, tenantController.updateMyCheckoutDate);

module.exports = router;