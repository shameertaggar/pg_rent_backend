const propertyModel = require("../models/propertyModel");
const { validateCreateProperty, validateUpdateProperty } = require("../utils/validators/propertyValidator");
const {createMultipleRooms} = require("../controllers/roomController");
const roomModel = require("../models/roomModel");

// CREATE property
exports.createPROPERTY = async (req, res) => {
  const ownerId = req.user.ownerId;
  const payload = { ...req.body, ownerId }; // force ownerId from token
  const {totalRooms} = req.body;
  const { error } = validateCreateProperty(payload);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const propertyId = await propertyModel.createProperty(payload);
    if (totalRooms && Number.isInteger(totalRooms) && totalRooms > 0) {
      const rooms = Array.from({ length: totalRooms }, (_, i) => ({
        roomNumber: i+1,
        beds: 0, // default value, or make it part of the request
        availableBeds: 0,
        propertyId,
        ownerId,
        created_at: new Date(),
        updated_at: new Date()
      }));
      await roomModel.createMultipleRooms(rooms);
    }
    res.status(201).json({ propertyId, message: "Property created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all properties for logged-in owner
exports.getAllPROPERTY = async (req, res) => {
  const ownerId = req.user.ownerId;

  try {
    const data = await propertyModel.getAllProperties(ownerId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET specific property by ID (owned by the logged-in owner)
exports.getPROPERTYById = async (req, res) => {
  const ownerId = req.user.ownerId;

  try {
    const data = await propertyModel.getPropertyById(req.params.id, ownerId);
    if (!data) return res.status(404).json({ error: "Not found or unauthorized" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE property by ID
exports.updatePROPERTY = async (req, res) => {
  const ownerId = req.user.ownerId;
  const payload = { ...req.body, ownerId }; // force ownerId from token

  const { error } = validateUpdateProperty(payload);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    await propertyModel.updateProperty(req.params.id, ownerId, req.body);
    res.status(200).json({ message: "PROPERTY updated successfully" });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

// DELETE property by ID
exports.deletePROPERTY = async (req, res) => {
  const ownerId = req.user.ownerId;

  try {
    await propertyModel.deleteProperty(req.params.id, ownerId);
    res.status(200).json({ message: "PROPERTY deleted successfully" });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
