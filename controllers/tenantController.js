
const { db } = require("../config/firebase");
const tenantModel = require("../models/tenantModel");
const { validateCreateTenant, validateUpdateTenant } = require("../utils/validators/tenantValidator");
const { Constants : C } = require("../utils/constants");


// CREATE tenant
exports.createTenant = async (req, res) => {
  try {
    const { propertyName,email, ...tenantData } = req.body;
    console.log("owner id from token")
    const ownerId = req.user.ownerId; 
    console.log("owner id from token",ownerId)
    // Fetch properties owned by the owner
    
    const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();

    if (propertySnapshot.empty) {
      return res.status(404).json({ error: `No properties found for the owner with ID: ${ownerId}` });
    }

    // Find property with matching name
    let propertyId = null;
    propertySnapshot.forEach(doc => {
      const property = doc.data();
      if (property.propertyName === propertyName) {
        propertyId = doc.id;
      }
    });

    if (!propertyId) {
      return res.status(404).json({ error: `Property with name "${propertyName}" not found for owner ID ${ownerId}` });
    }

    // Construct full tenant data object
    const tenantWithOwnerData = {
      ...tenantData,
      propertyId,
      ownerId,
      propertyName,
      checkIn: new Date(),
      checkOut: null,
      created_at: new Date(),
      updated_at: new Date()
    };

    // Validate input
    const { error } = validateCreateTenant(tenantWithOwnerData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Save to DB
    const id = await tenantModel.createTenant(tenantWithOwnerData);
    res.status(201).json({ id, message: "Tenant created successfully" });

  } catch (err) {
    console.error("Error creating tenant:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET all tenants for logged-in owner
exports.getAllTenants = async (req, res) => {
  const ownerId = req.user.ownerId;
  console.log("owner id from token",ownerId)
  try {
    const data = await tenantModel.getAllTenants(ownerId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET tenant by ID
exports.getTenantById = async (req, res) => {
  const ownerId = req.user.ownerId;
  try {
    const data = await tenantModel.getTenantById(req.params.id, ownerId);
    if (!data) return res.status(404).json({ error: "Not found or unauthorized" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE tenant
exports.updateTenant = async (req, res) => {
  const { propertyName, ownerId, checkOut, ...tenantData } = req.body;

    // Fetch properties owned by the owner
    const propertySnapshot = await db.collection("properties")
      .where(C.OWNER_ID, "==", ownerId) // Query using owner_id
      .get();

    if (propertySnapshot.empty) {
      return res.status(404).json({ error: `No properties found for the owner with ID: ${ownerId}` });
    }

    // Find the property with the given pgName from the properties fetched
    let propertyId = null;
    propertySnapshot.forEach(doc => {
      const property = doc.data();
      if (property.propertyName === propertyName) {
        propertyId = doc.id; // Get the property_id of the matching property
      }
    });

    if (!propertyId) {
      return res.status(404).json({ error: `Property with name ${propertyName} not found for owner with ID ${ownerId}` });
    }

    // Add property_id and owner_id to the tenant data
    const tenantWithOwnerData = {
      ...tenantData,
      propertyId,
      ownerId,
      checkOut: checkOut ? new Date(checkOut) : null,
      updated_at: new Date()
    };

    // Validate tenant data before proceeding
    const { error } = validateUpdateTenant(tenantWithOwnerData);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    await tenantModel.updateTenant(req.params.id, ownerId, req.body);
    res.status(200).json({ message: "Tenant updated successfully" });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

// DELETE tenant
exports.deleteTenant = async (req, res) => {
  const ownerId = req.user.ownerId;

  try {
    await tenantModel.deleteTenant(req.params.id, ownerId);
    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
