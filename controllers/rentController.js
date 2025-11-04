const RentModel = require("../models/rentModel");
const roomModel = require("../models/roomModel");
const {
  validateCreateRent,
  validateUpdateRent,
} = require("../utils/validators/rentValidator");

exports.createRent = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const { roomId, bedNumber, tenantId, ...rentData } = req.body;

    // If bed-specific rent is provided, get the actual rent from the bed
    if (roomId && bedNumber) {
      try {
        const room = await roomModel.getRoomById(roomId, ownerId);
        if (room && room.bedsArray) {
          const bed = room.bedsArray.find((b) => b.bedNumber === bedNumber);
          if (bed) {
            rentData.amount_paid = bed.rent;
            rentData.bedNumber = bedNumber;
            rentData.roomId = roomId;
          }
        }
      } catch (bedError) {
        return res
          .status(400)
          .json({ error: `Error fetching bed rent: ${bedError.message}` });
      }
    }

    const rentWithOwnerData = {
      ...rentData,
      tenantId,
      ownerId,
    };

    const { error } = validateCreateRent(rentWithOwnerData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const rentId = await RentModel.createRent(rentWithOwnerData);
    res.status(201).json({ id: rentId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRent = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const rentList = await RentModel.getAllRent(ownerId);
    res.status(200).json(rentList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRentById = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const rent = await RentModel.getRentById(req.params.id, ownerId);
    if (!rent) return res.status(404).json({ error: "Rent record not found" });
    res.status(200).json(rent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRent = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const updateData = {
      ...req.body,
      ownerId,
    };

    const { error } = validateUpdateRent(updateData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    await RentModel.updateRent(req.params.id, req.body, ownerId);
    res.status(200).json({ message: "Rent record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRent = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    await RentModel.deleteRent(req.params.id, ownerId);
    res.status(200).json({ message: "Rent record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
