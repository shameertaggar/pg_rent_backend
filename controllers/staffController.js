// controllers/staffController.js

const { db } = require('../config/firebase');
const STAFF_COLLECTION = "Staff";

// Create a staff member
exports.createStaff = async (req, res) => {
  try {
    const staffData = {
      ...req.body,
      joining_date: new Date(req.body.joining_date),
      created_at: new Date(),
      updated_at: new Date()
    };
    const docRef = await db.collection(STAFF_COLLECTION).add(staffData);
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const snapshot = await db.collection(STAFF_COLLECTION).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff member by ID
exports.getStaffById = async (req, res) => {
  try {
    const doc = await db.collection(STAFF_COLLECTION).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Staff not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff member
exports.updateStaff = async (req, res) => {
  try {
    await db.collection(STAFF_COLLECTION).doc(req.params.id).update({
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
    await db.collection(STAFF_COLLECTION).doc(req.params.id).delete();
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
