const { db } = require("../config/firebase");
const { Constants : C } = require("../utils/constants");

// CREATE
const createTenant = async (data) => {
  console.log("Creating tenant with data in model")
  const docRef = await db.collection(C.TENANT_COLLECTION).add(data);
  return docRef.id;
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

module.exports = {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant
};
