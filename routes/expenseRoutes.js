const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const expenseController = require("../controllers/expenseController");

router.post("/", authenticateJWT, expenseController.createExpense);
router.get("/", authenticateJWT, expenseController.getAllExpenses);
router.get("/:id", authenticateJWT, expenseController.getExpenseById);
router.put("/:id", authenticateJWT, expenseController.updateExpense);
router.delete("/:id", authenticateJWT, expenseController.deleteExpense);

module.exports = router;
