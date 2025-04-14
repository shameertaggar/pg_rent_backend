const { db } = require("../config/firebase");

const ROOM_COLLECTION = "Rooms";

const RoomModel = {
  async createRoom(data) {
    const docRef = await db.collection(ROOM_COLLECTION).add({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return docRef.id;
  },

  async getAllRooms() {
    const snapshot = await db.collection(ROOM_COLLECTION).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getRoomById(id) {
    const doc = await db.collection(ROOM_COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async updateRoom(id, data) {
    await db.collection(ROOM_COLLECTION).doc(id).update({
      ...data,
      updated_at: new Date(),
    });
  },

  async deleteRoom(id) {
    await db.collection(ROOM_COLLECTION).doc(id).delete();
  }
};

module.exports = RoomModel;
