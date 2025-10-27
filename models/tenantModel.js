const { db } = require("../config/firebase");
const { Constants : C } = require("../utils/constants");

// Generate unique tenant code
const generateTenantCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};


// CREATE
const createTenant = async (data) => {
  // Generate unique tenant code
  let tenantCode;
  let isUnique = false;
  
  while (!isUnique) {
    tenantCode = generateTenantCode();
    const existingTenant = await db.collection(C.TENANT_COLLECTION)
      .where('tenantCode', '==', tenantCode)
      .get();
    isUnique = existingTenant.empty;
  }
  
  const tenantData = {
    ...data,
    tenantCode,
    created_at: new Date(),
    updated_at: new Date()
  };
  
  const docRef = await db.collection(C.TENANT_COLLECTION).add(tenantData);
  return { id: docRef.id, tenantCode };
};

// Authenticate tenant with code and DOB
const authenticateTenant = async (tenantCode, dob) => {
  const snapshot = await db.collection(C.TENANT_COLLECTION)
    .where('tenantCode', '==', tenantCode)
    .get();

  if (snapshot.empty) {
    throw new Error("Invalid tenant code");
  }

  const tenantDoc = snapshot.docs[0];
  const tenantData = tenantDoc.data();
  
  // Convert DOB to string format for comparison (YYYY-MM-DD)
  const tenantDOB = tenantData.dob instanceof Date 
    ? tenantData.dob.toISOString().split('T')[0]
    : tenantData.dob;
  
  if (tenantDOB !== dob) {
    throw new Error("Invalid date of birth");
  }

  return { id: tenantDoc.id, ...tenantData };
};


const getAllTenants = async (ownerId) => {
  // Get all PGs owned by this owner
  const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
    .where(C.OWNER_ID, "==", ownerId)
    .get();

  
  const propertyIds = propertySnapshot.docs.map(doc => doc.id);

  // Get tenants associated with these PG IDs
  const tenantSnapshot = await db.collection(C.TENANT_COLLECTION)
    .where(C.PROPERTY_ID, "in", propertyIds.length > 0 ? propertyIds : ["none"]) // empty array fallback
    .get();

  return tenantSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// GET ONE tenant by tenantId and ownerId
const getTenantById = async (tenantId, ownerId) => {
  const tenantDoc = await db.collection(C.TENANT_COLLECTION).doc(tenantId).get();
  
  if (!tenantDoc.exists) return null;
  
  const tenantData = tenantDoc.data();
  
  // Check if the PG belongs to the owner
  const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(tenantData.propertyId).get();
  if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) return null;

  return { id: tenantDoc.id, ...tenantData };
};

// UPDATE
const updateTenant = async (tenantId, ownerId, data) => {
  const tenantRef = db.collection(C.TENANT_COLLECTION).doc(tenantId);
  const tenantDoc = await tenantRef.get();

  if (!tenantDoc.exists || tenantDoc.data().ownerId !== ownerId) {
    throw new Error("Unauthorized or Tenant not found");
  }

  await tenantRef.update(data);
};

// DELETE
const deleteTenant = async (tenantId, ownerId) => {
  const tenantRef = db.collection(C.TENANT_COLLECTION).doc(tenantId);
  const tenantDoc = await tenantRef.get();

  if (!tenantDoc.exists || tenantDoc.data().ownerId !== ownerId) {
    throw new Error("Unauthorized or Tenant not found");
  }

  await tenantRef.delete();
};

// Get tenant rent history
const getTenantRentHistory = async (tenantId) => {
  const tenantDoc = await db.collection(C.TENANT_COLLECTION).doc(tenantId).get();
  
  if (!tenantDoc.exists) {
    throw new Error("Tenant not found");
  }

  const tenantData = tenantDoc.data();
  
  // Get rent records for this tenant
  const rentSnapshot = await db.collection(C.RENT_COLLECTION)
    .where('tenantId', '==', tenantId)
    .orderBy('created_at', 'desc')
    .get();

  return {
    tenant: { id: tenantDoc.id, ...tenantData },
    rentHistory: rentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  };
};

// Get tenant complaints/issues
const getTenantComplaints = async (tenantId) => {
  const tenantDoc = await db.collection(C.TENANT_COLLECTION).doc(tenantId).get();
  
  if (!tenantDoc.exists) {
    throw new Error("Tenant not found");
  }

  // Get complaints/issues for this tenant
  const complaintsSnapshot = await db.collection(C.ISSUE_COLLECTION)
    .where('tenantId', '==', tenantId)
    .orderBy('created_at', 'desc')
    .get();

  return complaintsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update tenant checkout date
const updateTenantCheckout = async (tenantId, checkoutDate) => {
  const tenantRef = db.collection(C.TENANT_COLLECTION).doc(tenantId);
  const tenantDoc = await tenantRef.get();

  if (!tenantDoc.exists) {
    throw new Error("Tenant not found");
  }

  await tenantRef.update({
    checkoutDate: new Date(checkoutDate),
    updated_at: new Date()
  });

  return { message: "Checkout date updated successfully" };
};

module.exports = {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
  authenticateTenant,
  getTenantRentHistory,
  getTenantComplaints,
  updateTenantCheckout
};
