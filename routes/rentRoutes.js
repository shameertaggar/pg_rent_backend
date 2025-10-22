const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const rentController = require("../controllers/rentController");

router.post("/", authenticateJWT, rentController.createRent);
router.get("/", authenticateJWT, rentController.getAllRent);
router.get("/:id", authenticateJWT, rentController.getRentById);
router.put("/:id", authenticateJWT, rentController.updateRent);
router.delete("/:id", authenticateJWT, rentController.deleteRent);

module.exports = router;
