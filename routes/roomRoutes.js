const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const roomController = require("../controllers/roomController");

router.post("/", authenticateJWT, roomController.createRoom);
//router.post("/bulk", authenticateJWT, roomController.createMultipleRooms);
router.get("/", authenticateJWT, roomController.getAllRooms); // expects query param ?propertyId=xyz
router.get("/:id", authenticateJWT, roomController.getRoomById);
router.put("/:id", authenticateJWT, roomController.updateRoom);
router.delete("/:id", authenticateJWT, roomController.deleteRoom);

// Bed management routes
router.get("/:roomId/beds/available", authenticateJWT, roomController.getAvailableBeds);
router.post("/beds/assign", authenticateJWT, roomController.assignBedToTenant);
router.post("/beds/release", authenticateJWT, roomController.releaseBedFromTenant);
router.put("/beds/rent", authenticateJWT, roomController.updateBedRent);

module.exports = router;
