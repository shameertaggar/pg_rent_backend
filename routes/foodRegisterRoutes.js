const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const foodController = require("../controllers/foodRegisterController");

router.post("/", authenticateJWT, foodController.createFoodEntry);
router.get("/", authenticateJWT, foodController.getAllFoodEntries); // optional ?pg_id=123
router.get("/by-date", authenticateJWT, foodController.getFoodEntryByDate); // ?pg_id=xxx&date=yyyy-mm-dd
router.get("/analytics", authenticateJWT, foodController.getFoodAnalytics); // ?startDate=yyyy-mm-dd&endDate=yyyy-mm-dd
router.get("/insights", authenticateJWT, foodController.getKitchenOptimizationInsights); // ?startDate=yyyy-mm-dd&endDate=yyyy-mm-dd
router.put("/:id", authenticateJWT, foodController.updateFoodEntry);
router.delete("/:id", authenticateJWT, foodController.deleteFoodEntry);

module.exports = router;
