const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const bookingController = require("../controllers/bookingController");

// Basic CRUD operations
router.post("/", authenticateJWT, bookingController.createBooking);
router.get("/", authenticateJWT, bookingController.getAllBookings);
router.get("/:id", authenticateJWT, bookingController.getBookingById);
router.put("/:id", authenticateJWT, bookingController.updateBooking);
router.delete("/:id", authenticateJWT, bookingController.deleteBooking);

// Filter and search operations
router.get("/filter/all", authenticateJWT, bookingController.filterBookings);
router.get("/stats/summary", authenticateJWT, bookingController.getBookingStats);
router.get("/search/term", authenticateJWT, bookingController.searchBookings);

module.exports = router;
