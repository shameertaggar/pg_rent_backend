const propertyModel = require("../models/propertyModel");
const {
  validateCreateProperty,
  validateUpdateProperty,
} = require("../utils/validators/propertyValidator");
const { createMultipleRooms } = require("../controllers/roomController");
const roomModel = require("../models/roomModel");

// CREATE property
exports.createPROPERTY = async (req, res) => {
  const ownerId = req.user.ownerId;
  const payload = { ...req.body, ownerId }; // force ownerId from token
  const { totalRooms, totalBeds } = req.body;
  
  // Set availableBeds to totalBeds when property is created
  if (totalBeds && Number.isInteger(totalBeds) && totalBeds > 0) {
    payload.availableBeds = totalBeds;
  } else if (payload.totalBeds) {
    payload.availableBeds = payload.totalBeds;
  }
  
  const { error } = validateCreateProperty(payload);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const propertyId = await propertyModel.createProperty(payload);
    if (
      totalRooms &&
      Number.isInteger(totalRooms) &&
      totalRooms > 0 &&
      totalBeds &&
      Number.isInteger(totalBeds) &&
      totalBeds > 0
    ) {
      // Calculate beds per room (distribute total beds across rooms)
      const bedsPerRoom = Math.floor(totalBeds / totalRooms);
      const extraBeds = totalBeds % totalRooms;

      const rooms = Array.from({ length: totalRooms }, (_, i) => ({
        roomNumber: i + 1,
        beds: bedsPerRoom + (i < extraBeds ? 1 : 0), // Distribute extra beds to first few rooms
        availableBeds: bedsPerRoom + (i < extraBeds ? 1 : 0), // All beds are initially available
        defaultRent: payload.rentPerBed, // Use property's rent per bed as default
        propertyId,
        ownerId,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      await roomModel.createMultipleRooms(rooms);
    }
    res
      .status(201)
      .json({ propertyId, message: "Property created successfully" });
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
    if (!data)
      return res.status(404).json({ error: "Not found or unauthorized" });
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
