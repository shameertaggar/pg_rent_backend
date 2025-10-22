// controllers/staffController.js

const { db } = require('../config/firebase');
const { Constants: C } = require('../utils/constants');
const { validateCreateStaff, validateUpdateStaff } = require('../utils/validators/staffValidator');
const STAFF_COLLECTION = "Staff";

// Create a staff member
exports.createStaff = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const staffData = {
      ...req.body,
      ownerId,
      joining_date: new Date(req.body.joining_date),
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const { error } = validateCreateStaff(staffData);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const docRef = await db.collection(STAFF_COLLECTION).add(staffData);
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all staff members for logged-in owner
exports.getAllStaff = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const snapshot = await db.collection(STAFF_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff member by ID
exports.getStaffById = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const doc = await db.collection(STAFF_COLLECTION).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Staff not found" });
    
    const staffData = doc.data();
    if (staffData.ownerId !== ownerId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    res.status(200).json({ id: doc.id, ...staffData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff member
exports.updateStaff = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const updateData = {
      ...req.body,
      ownerId
    };
    
    const { error } = validateUpdateStaff(updateData);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const staffRef = db.collection(STAFF_COLLECTION).doc(req.params.id);
    const staffDoc = await staffRef.get();
    
    if (!staffDoc.exists) {
      return res.status(404).json({ error: "Staff not found" });
    }
    
    const staffData = staffDoc.data();
    if (staffData.ownerId !== ownerId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    await staffRef.update({
      ...req.body,
      updated_at: new Date()
    });
    res.status(200).json({ message: "Staff updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete staff member
exports.deleteStaff = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const staffRef = db.collection(STAFF_COLLECTION).doc(req.params.id);
    const staffDoc = await staffRef.get();
    
    if (!staffDoc.exists) {
      return res.status(404).json({ error: "Staff not found" });
    }
    
    const staffData = staffDoc.data();
    if (staffData.ownerId !== ownerId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    await staffRef.delete();
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
