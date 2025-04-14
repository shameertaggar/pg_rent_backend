const express = require("express");
const router = express.Router();
const pgController = require("../controllers/pgController");

router.post("/", pgController.createPG);
router.get("/", pgController.getAllPGs);
router.get("/:id", pgController.getPGById);
router.put("/:id", pgController.updatePG);
router.delete("/:id", pgController.deletePG);

module.exports = router;
