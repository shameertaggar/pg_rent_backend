const ExpenseModel = require("../models/expenseModel");
const { validateCreateExpense, validateUpdateExpense } = require("../utils/validators/expenseValidator");

exports.createExpense = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const expenseData = {
      ...req.body,
      ownerId
    };
    
    const { error } = validateCreateExpense(expenseData);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const expenseId = await ExpenseModel.createExpense(expenseData);
    res.status(201).json({ id: expenseId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const expenses = await ExpenseModel.getAllExpenses(ownerId);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const expense = await ExpenseModel.getExpenseById(req.params.id, ownerId);
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const updateData = {
      ...req.body,
      ownerId
    };
    
    const { error } = validateUpdateExpense(updateData);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    await ExpenseModel.updateExpense(req.params.id, req.body, ownerId);
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    await ExpenseModel.deleteExpense(req.params.id, ownerId);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
