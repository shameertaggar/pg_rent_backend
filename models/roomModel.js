const { db } = require("../config/firebase");
const { Constants: C } = require("../utils/constants");

// Create one room
const createRoom = async (data) => {
  const docRef = await db.collection(C.ROOM_COLLECTION).add(data);
  return docRef.id;
};

const getLastRoomNumber = async (propertyId) =>{
  const snapshot = await db.collection(C.ROOM_COLLECTION)
    .where(C.PROPERTY_ID, "==", propertyId)
    .orderBy("roomNumber","desc")
    .limit(1).get();
    
    if(snapshot.empty || !snapshot.docs[0]) return 0;
    const lastRoom = snapshot.docs[0].data();
    console.log(lastRoom.roomNumber);
    return lastRoom.roomNumber;
}
// Create multiple rooms=
const createMultipleRooms = async (rooms) => {
  const batch = db.batch();
  rooms.forEach(room => {
    const docRef = db.collection(C.ROOM_COLLECTION).doc();
    batch.set(docRef, room);
  });
  await batch.commit();
};



// Update room (e.g., number of beds)
const updateRoom = async (roomId, data, ownerId) => {
  const roomRef = db.collection(C.ROOM_COLLECTION).doc(roomId);
  const roomDoc = await roomRef.get();

  if (!roomDoc.exists || roomDoc.data().ownerId !== ownerId) {
    throw new Error("Unauthorized or Room not found");
  }

  await roomRef.update(data);
};

// Get all rooms by property
const getAllRooms = async (ownerId) => {
  const snapshot = await db.collection(C.ROOM_COLLECTION)
    .where(C.OWNER_ID, "==", ownerId)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get room by ID
const getRoomById = async (roomId, ownerId) => {
  const doc = await db.collection(C.ROOM_COLLECTION).doc(roomId).get();
  if (!doc.exists || doc.data().ownerId !== ownerId) return null;
  return { id: doc.id, ...doc.data() };
};

// Delete room
const deleteRoom = async (roomId, ownerId) => {
  const docRef = db.collection(C.ROOM_COLLECTION).doc(roomId);
  const doc = await docRef.get();
  if (!doc.exists || doc.data().ownerId !== ownerId) {
    throw new Error("Unauthorized or Room not found");
  }
  await docRef.delete();
};

module.exports = {
  createRoom,
  createMultipleRooms,
  updateRoom,
  getAllRooms,
  getRoomById,
  deleteRoom,
  getLastRoomNumber,
};
