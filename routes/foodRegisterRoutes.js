const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodRegisterController");

router.post("/", foodController.createFoodEntry);
router.get("/", foodController.getAllFoodEntries); // optional ?pg_id=123
router.get("/by-date", foodController.getFoodEntryByDate); // ?pg_id=xxx&date=yyyy-mm-dd
router.put("/:id", foodController.updateFoodEntry);
router.delete("/:id", foodController.deleteFoodEntry);

module.exports = router;
