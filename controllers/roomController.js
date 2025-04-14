const RoomModel = require("../models/roomModel");

exports.createRoom = async (req, res) => {
  try {
    const roomId = await RoomModel.createRoom(req.body);
    res.status(201).json({ id: roomId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await RoomModel.getRoomById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    await RoomModel.updateRoom(req.params.id, req.body);
    res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await RoomModel.deleteRoom(req.params.id);
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
