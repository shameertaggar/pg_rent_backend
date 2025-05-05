const { db } = require("../config/firebase");
const { Constants : C } = require("../utils/constants");

// CREATE
const createProperty = async (data) => {
  const docRef = await db.collection(C.PROPERTY_COLLECTION).add(data);
  return docRef.id;
};

// GET ALL by ownerId
const getAllProperties = async (ownerId) => {
  const snapshot = await db.collection(C.PROPERTY_COLLECTION)
    .where(C.OWNER_ID, "==", ownerId)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// GET ONE by ownerId and doc id
const getPropertyById = async (id, ownerId) => {
  const doc = await db.collection(C.PROPERTY_COLLECTION).doc(id).get();
  if (!doc.exists) return null;

  const data = doc.data();
  if (data.ownerId !== ownerId) return null;

  return { id: doc.id, ...data };
};

// UPDATE
const updateProperty = async (id, ownerId, data) => {
  const ref = db.collection(C.PROPERTY_COLLECTION).doc(id);
  const doc = await ref.get();

  if (!doc.exists || doc.data().ownerId !== ownerId) {
    throw new Error("Unauthorized or not found");
  }

  await ref.update(data);
};

// DELETE
const deleteProperty = async (id, ownerId) => {
  const ref = db.collection(C.PROPERTY_COLLECTION).doc(id);
  const doc = await ref.get();

  if (!doc.exists || doc.data().ownerId !== ownerId) {
    throw new Error("Unauthorized or not found");
  }

  await ref.delete();
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};
