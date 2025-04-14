const { db } = require("../config/firebase");
const FOOD_COLLECTION = "FoodRegister";

const foodModel = {
  async addEntry(data) {
    const timestamp = new Date();
    const entry = {
      ...data,
      created_at: timestamp,
      updated_at: timestamp,
    };
    const docRef = await db.collection(FOOD_COLLECTION).add(entry);
    return { id: docRef.id };
  },

  async getAllEntries(pg_id) {
    let query = db.collection(FOOD_COLLECTION);
    if (pg_id) query = query.where("pg_id", "==", pg_id);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getEntryByDate(pg_id, date) {
    const snapshot = await db.collection(FOOD_COLLECTION)
      .where("pg_id", "==", pg_id)
      .where("date", "==", date)
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async updateEntry(id, data) {
    data.updated_at = new Date();
    await db.collection(FOOD_COLLECTION).doc(id).update(data);
    return { message: "Entry updated successfully" };
  },

  async deleteEntry(id) {
    await db.collection(FOOD_COLLECTION).doc(id).delete();
    return { message: "Entry deleted successfully" };
  }
};

module.exports = foodModel;
