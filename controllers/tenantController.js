const { db } = require("../config/firebase");
const tenantModel = require("../models/tenantModel");
const roomModel = require("../models/roomModel");
const {
  validateCreateTenant,
  validateUpdateTenant,
  validateCheckoutUpdate,
} = require("../utils/validators/tenantValidator");
const { Constants: C } = require("../utils/constants");

// CREATE tenant
exports.createTenant = async (req, res) => {
  try {
    const { propertyName, roomId, bedNumber, customRent, ...tenantData } =
      req.body;
    const ownerId = req.user.ownerId;

    // Fetch properties owned by the owner
    const propertySnapshot = await db
      .collection(C.PROPERTY_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();

    if (propertySnapshot.empty) {
      return res
        .status(404)
        .json({
          error: `No properties found for the owner with ID: ${ownerId}`,
        });
    }

    // Find property with matching name
    let propertyId = null;
    propertySnapshot.forEach((doc) => {
      const property = doc.data();
      if (property.propertyName === propertyName) {
        propertyId = doc.id;
      }
    });

    if (!propertyId) {
      return res
        .status(404)
        .json({
          error: `Property with name "${propertyName}" not found for owner ID ${ownerId}`,
        });
    }

    // Construct full tenant data object (email is now included in tenantData)
    const tenantWithOwnerData = {
      ...tenantData,
      propertyId,
      ownerId,
      propertyName,
      checkIn: new Date(),
      checkOut: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Validate input
    const { error } = validateCreateTenant(tenantWithOwnerData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Save tenant to DB
    const { id: tenantId, tenantCode } =
      await tenantModel.createTenant(tenantWithOwnerData);

    // If bed assignment is provided, assign bed to tenant
    if (roomId && bedNumber && customRent) {
      try {
        await roomModel.assignBedToTenant(
          roomId,
          bedNumber,
          tenantId,
          customRent,
          ownerId,
        );

        // Update tenant with bed information
        await tenantModel.updateTenant(tenantId, ownerId, {
          roomId,
          bedNumber,
          customRent,
          updated_at: new Date(),
        });
      } catch (bedError) {
        // If bed assignment fails, delete the tenant
        await tenantModel.deleteTenant(tenantId, ownerId);
        return res
          .status(400)
          .json({ error: `Bed assignment failed: ${bedError.message}` });
      }
    }

    res.status(201).json({
      id: tenantId,
      tenantCode,
      message: "Tenant created successfully",
      bedAssigned: !!(roomId && bedNumber && customRent),
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET all tenants for logged-in owner
exports.getAllTenants = async (req, res) => {
  const ownerId = req.user.ownerId;
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
    if (!data)
      return res.status(404).json({ error: "Not found or unauthorized" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE tenant
exports.updateTenant = async (req, res) => {
  const { propertyName, ownerId, checkOut, roomId, bedNumber, ...tenantData } =
    req.body;

  // Fetch properties owned by the owner
  const propertySnapshot = await db
    .collection("properties")
    .where(C.OWNER_ID, "==", ownerId) // Query using owner_id
    .get();

  if (propertySnapshot.empty) {
    return res
      .status(404)
      .json({ error: `No properties found for the owner with ID: ${ownerId}` });
  }

  // Find the property with the given pgName from the properties fetched
  let propertyId = null;
  propertySnapshot.forEach((doc) => {
    const property = doc.data();
    if (property.propertyName === propertyName) {
      propertyId = doc.id; // Get the property_id of the matching property
    }
  });

  if (!propertyId) {
    return res
      .status(404)
      .json({
        error: `Property with name ${propertyName} not found for owner with ID ${ownerId}`,
      });
  }

  // Add property_id and owner_id to the tenant data
  const tenantWithOwnerData = {
    ...tenantData,
    propertyId,
    ownerId,
    checkOut: checkOut ? new Date(checkOut) : null,
    updated_at: new Date(),
  };

  // Validate tenant data before proceeding
  const { error } = validateUpdateTenant(tenantWithOwnerData);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // If tenant is checking out and has a bed assigned, release the bed
    if (checkOut && roomId && bedNumber) {
      try {
        await roomModel.releaseBedFromTenant(roomId, bedNumber, ownerId);
      } catch (bedError) {
        console.error("Error releasing bed:", bedError.message);
        // Continue with tenant update even if bed release fails
      }
    }

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

// TENANT PORTAL METHODS

// Get tenant's own rent history
exports.getMyRentHistory = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const result = await tenantModel.getTenantRentHistory(tenantId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tenant's own complaints/issues
exports.getMyComplaints = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const complaints = await tenantModel.getTenantComplaints(tenantId);
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update tenant's checkout date
exports.updateMyCheckoutDate = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { checkoutDate } = req.body;

    // Validate input
    const { error } = validateCheckoutUpdate({ checkoutDate });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await tenantModel.updateTenantCheckout(
      tenantId,
      checkoutDate,
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tenant's profile information
exports.getMyProfile = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const tenantDoc = await db
      .collection(C.TENANT_COLLECTION)
      .doc(tenantId)
      .get();

    if (!tenantDoc.exists) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    const tenantData = tenantDoc.data();
    // Remove sensitive information
    const { ownerId, ...safeData } = tenantData;

    res.status(200).json({ id: tenantDoc.id, ...safeData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
