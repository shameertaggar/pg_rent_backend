const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const authenticateJWT = require("../middlewares/authMiddleware");

// All routes below will be protected and have access to req.user
router.post("/", authenticateJWT, propertyController.createPROPERTY);
router.get("/", authenticateJWT, propertyController.getAllPROPERTY);
router.get("/:id", authenticateJWT, propertyController.getPROPERTYById);
router.put("/:id", authenticateJWT, propertyController.updatePROPERTY);
router.delete("/:id", authenticateJWT, propertyController.deletePROPERTY);

module.exports = router;
