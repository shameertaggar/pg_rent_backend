const { db } = require("../config/firebase");

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

  async getAllRent() {
    const snapshot = await db.collection(RENT_COLLECTION).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getRentById(id) {
    const doc = await db.collection(RENT_COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async updateRent(id, data) {
    await db.collection(RENT_COLLECTION).doc(id).update({
      ...data,
      updated_at: new Date(),
    });
  },

  async deleteRent(id) {
    await db.collection(RENT_COLLECTION).doc(id).delete();
  }
};

module.exports = RentModel;
