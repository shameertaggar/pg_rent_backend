const foodModel = require("../models/foodRegisterModel");

exports.createFoodEntry = async (req, res) => {
  try {
    const result = await foodModel.addEntry(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFoodEntries = async (req, res) => {
  try {
    const pg_id = req.query.pg_id;
    const result = await foodModel.getAllEntries(pg_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFoodEntryByDate = async (req, res) => {
  try {
    const { pg_id, date } = req.query;
    const result = await foodModel.getEntryByDate(pg_id, date);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFoodEntry = async (req, res) => {
  try {
    const result = await foodModel.updateEntry(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFoodEntry = async (req, res) => {
  try {
    const result = await foodModel.deleteEntry(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
