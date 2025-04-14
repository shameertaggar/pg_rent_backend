const ExpenseModel = require("../models/expenseModel");

exports.createExpense = async (req, res) => {
  try {
    const expenseId = await ExpenseModel.createExpense(req.body);
    res.status(201).json({ id: expenseId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseModel.getAllExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await ExpenseModel.getExpenseById(req.params.id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    await ExpenseModel.updateExpense(req.params.id, req.body);
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await ExpenseModel.deleteExpense(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
