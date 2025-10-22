const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const profitLossController = require("../controllers/profitLossController");

// Profit/Loss Analysis Routes
router.get("/analysis", authenticateJWT, profitLossController.getProfitLossAnalysis);
router.get("/summary", authenticateJWT, profitLossController.getProfitLossSummary);
router.get("/property/:propertyId", authenticateJWT, profitLossController.getPropertyProfitLoss);
router.get("/trends/monthly", authenticateJWT, profitLossController.getMonthlyTrends);
router.get("/expenses/categories", authenticateJWT, profitLossController.getExpenseCategoryAnalysis);
router.get("/recommendations", authenticateJWT, profitLossController.getFinancialRecommendations);

module.exports = router;
