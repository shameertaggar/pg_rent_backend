const roomModel = require("../models/roomModel");
const { db } = require("../config/firebase");
const { Constants: C } = require("../utils/constants");
const roomValidator = require("../utils/validators/roomValidator");

// Create one room
exports.createRoom = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const { propertyId, beds } = req.body;

    const lastRoomNumber = await roomModel.getLastRoomNumber(propertyId);
    const newRoomNumber = (lastRoomNumber || 0) + 1;
    const roomData = {
      propertyId,
      roomNumber: newRoomNumber,
      beds,
      availableBeds: beds,
      ownerId,
      created_at: new Date(),
      updated_at: new Date()
    };

    // validate room data
    const {error} = roomValidator.validateCreateRoom(roomData);
    if(error) return res.status(400).json({error: error.details[0].message});
    const roomId = await roomModel.createRoom(roomData);
    res.status(201).json({ roomId, message: "Room created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create multiple rooms
// exports.createMultipleRooms = async (req, res) => {
//   try {
//     const ownerId = req.user.ownerId;
//     const rooms = req.body.map(room => ({
//       ...room,
//       ownerId,
//       created_at: new Date(),
//       updated_at: new Date()
//     }));

//     await roomModel.createMultipleRooms(rooms);
//     res.status(201).json({ message: "Rooms created successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Update room (e.g. number of beds)
exports.updateRoom = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const roomId = req.params.id;
    const updateData = {
      ...req.body,
      updated_at: new Date()
    };

    const {error} = roomValidator.validateUpdateRoom(roomData);
    if(error) return res.status(400).json({error: error.details[0].message});
    await roomModel.updateRoom(roomId, updateData, ownerId);
    res.status(200).json({ message: "Room updated successfully" });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

// Get all rooms for a property
exports.getAllRooms = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const rooms = await roomModel.getAllRooms(ownerId);
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const room = await roomModel.getRoomById(req.params.id, ownerId);
    if (!room) return res.status(404).json({ error: "Room not found or unauthorized" });

    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    await roomModel.deleteRoom(req.params.id, ownerId);
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
