// controllers/tenantController.js

const { db } = require('../config/firebase');
const TENANT_COLLECTION = "Tenants";

// Create a tenant
exports.createTenant = async (req, res) => {
  try {
    const tenantData = {
      ...req.body,
      check_in: new Date(req.body.check_in),
      check_out: req.body.check_out ? new Date(req.body.check_out) : null,
      created_at: new Date(),
      updated_at: new Date()
    };
    const docRef = await db.collection(TENANT_COLLECTION).add(tenantData);
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tenants
exports.getAllTenants = async (req, res) => {
  try {
    const snapshot = await db.collection(TENANT_COLLECTION).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tenant by ID
exports.getTenantById = async (req, res) => {
  try {
    const doc = await db.collection(TENANT_COLLECTION).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Tenant not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update tenant
exports.updateTenant = async (req, res) => {
  try {
    await db.collection(TENANT_COLLECTION).doc(req.params.id).update({
      ...req.body,
      updated_at: new Date()
    });
    res.status(200).json({ message: "Tenant updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete tenant
exports.deleteTenant = async (req, res) => {
  try {
    await db.collection(TENANT_COLLECTION).doc(req.params.id).delete();
    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
