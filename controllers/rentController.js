const RentModel = require("../models/rentModel");

exports.createRent = async (req, res) => {
  try {
    const rentId = await RentModel.createRent(req.body);
    res.status(201).json({ id: rentId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRent = async (req, res) => {
  try {
    const rentList = await RentModel.getAllRent();
    res.status(200).json(rentList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRentById = async (req, res) => {
  try {
    const rent = await RentModel.getRentById(req.params.id);
    if (!rent) return res.status(404).json({ error: "Rent record not found" });
    res.status(200).json(rent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRent = async (req, res) => {
  try {
    await RentModel.updateRent(req.params.id, req.body);
    res.status(200).json({ message: "Rent record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRent = async (req, res) => {
  try {
    await RentModel.deleteRent(req.params.id);
    res.status(200).json({ message: "Rent record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
