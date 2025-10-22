const { db } = require("../config/firebase");
const { Constants: C } = require("../utils/constants");

const RENT_COLLECTION = "Rent";

const RentModel = {
  async createRent(data) {
    const docRef = await db.collection(RENT_COLLECTION).add({
      ...data,
      payment_date: data.payment_date || new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    return docRef.id;
  },

  async getAllRent(ownerId) {
    // Get all properties owned by this owner
    const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();

    const propertyIds = propertySnapshot.docs.map(doc => doc.id);

    // Get rent records associated with these property IDs
    const rentSnapshot = await db.collection(RENT_COLLECTION)
      .where(C.PROPERTY_ID, "in", propertyIds.length > 0 ? propertyIds : ["none"])
      .get();

    return rentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getRentById(id, ownerId) {
    const doc = await db.collection(RENT_COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    
    const rentData = doc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(rentData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) return null;

    return { id: doc.id, ...rentData };
  },

  async updateRent(id, data, ownerId) {
    const rentRef = db.collection(RENT_COLLECTION).doc(id);
    const rentDoc = await rentRef.get();

    if (!rentDoc.exists) {
      throw new Error("Rent record not found");
    }

    const rentData = rentDoc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(rentData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    await rentRef.update({
      ...data,
      updated_at: new Date(),
    });
  },

  async deleteRent(id, ownerId) {
    const rentRef = db.collection(RENT_COLLECTION).doc(id);
    const rentDoc = await rentRef.get();

    if (!rentDoc.exists) {
      throw new Error("Rent record not found");
    }

    const rentData = rentDoc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(rentData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    await rentRef.delete();
  }
};

module.exports = RentModel;
