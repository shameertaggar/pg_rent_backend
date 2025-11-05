const { db } = require("../config/firebase");
const { Constants: C } = require("../utils/constants");

// Create one room
const createRoom = async (data) => {
  // Initialize beds array with individual rent if not provided
  if (data.beds && !data.bedsArray) {
    data.bedsArray = Array.from({ length: data.beds }, (_, index) => ({
      bedNumber: index + 1,
      rent: data.defaultRent || 0,
      isOccupied: false,
      tenantId: null,
      occupiedAt: null
    }));
  }
  
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
    return lastRoom.roomNumber;
}
// Create multiple rooms
const createMultipleRooms = async (rooms) => {
  const batch = db.batch();
  rooms.forEach(room => {
    // Initialize beds array with individual rent if not provided
    if (room.beds && !room.bedsArray) {
      room.bedsArray = Array.from({ length: room.beds }, (_, index) => ({
        bedNumber: index + 1,
        rent: room.defaultRent || 0,
        isOccupied: false,
        tenantId: null,
        occupiedAt: null
      }));
    }
    
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

// Get available beds in a room
const getAvailableBeds = async (roomId, ownerId) => {
  const room = await getRoomById(roomId, ownerId);
  if (!room) return null;
  
  return room.bedsArray.filter(bed => !bed.isOccupied);
};

// Assign bed to tenant
const assignBedToTenant = async (roomId, bedNumber, tenantId, customRent, ownerId) => {
  const roomRef = db.collection(C.ROOM_COLLECTION).doc(roomId);
  const roomDoc = await roomRef.get();
  
  if (!roomDoc.exists || roomDoc.data().ownerId !== ownerId) {
    throw new Error("Unauthorized or Room not found");
  }
  
  const roomData = roomDoc.data();
  const bedIndex = roomData.bedsArray.findIndex(bed => bed.bedNumber === bedNumber);
  
  if (bedIndex === -1) {
    throw new Error("Bed not found");
  }
  
  if (roomData.bedsArray[bedIndex].isOccupied) {
    throw new Error("Bed is already occupied");
  }
  
  // Update the specific bed
  roomData.bedsArray[bedIndex] = {
    ...roomData.bedsArray[bedIndex],
    isOccupied: true,
    tenantId: tenantId,
    rent: customRent,
    occupiedAt: new Date()
  };
  
  // Update available beds count for room
  roomData.availableBeds = roomData.bedsArray.filter(bed => !bed.isOccupied).length;
  
  await roomRef.update(roomData);
  
  // Decrease property's availableBeds
  if (roomData.propertyId) {
    const propertyRef = db.collection(C.PROPERTY_COLLECTION).doc(roomData.propertyId);
    const propertyDoc = await propertyRef.get();
    
    if (propertyDoc.exists) {
      const propertyData = propertyDoc.data();
      const currentAvailableBeds = propertyData.availableBeds || 0;
      const newAvailableBeds = Math.max(0, currentAvailableBeds - 1);
      
      await propertyRef.update({
        availableBeds: newAvailableBeds,
        updated_at: new Date()
      });
    }
  }
  
  return roomData.bedsArray[bedIndex];
};

// Release bed from tenant
const releaseBedFromTenant = async (roomId, bedNumber, ownerId) => {
  const roomRef = db.collection(C.ROOM_COLLECTION).doc(roomId);
  const roomDoc = await roomRef.get();
  
  if (!roomDoc.exists || roomDoc.data().ownerId !== ownerId) {
    throw new Error("Unauthorized or Room not found");
  }
  
  const roomData = roomDoc.data();
  const bedIndex = roomData.bedsArray.findIndex(bed => bed.bedNumber === bedNumber);
  
  if (bedIndex === -1) {
    throw new Error("Bed not found");
  }
  
  // Only increase property's availableBeds if the bed was actually occupied
  const wasOccupied = roomData.bedsArray[bedIndex].isOccupied;
  
  // Release the bed
  roomData.bedsArray[bedIndex] = {
    ...roomData.bedsArray[bedIndex],
    isOccupied: false,
    tenantId: null,
    occupiedAt: null
  };
  
  // Update available beds count for room
  roomData.availableBeds = roomData.bedsArray.filter(bed => !bed.isOccupied).length;
  
  await roomRef.update(roomData);
  
  // Increase property's availableBeds only if bed was previously occupied
  if (wasOccupied && roomData.propertyId) {
    const propertyRef = db.collection(C.PROPERTY_COLLECTION).doc(roomData.propertyId);
    const propertyDoc = await propertyRef.get();
    
    if (propertyDoc.exists) {
      const propertyData = propertyDoc.data();
      const currentAvailableBeds = propertyData.availableBeds || 0;
      const totalBeds = propertyData.totalBeds || 0;
      const newAvailableBeds = Math.min(totalBeds, currentAvailableBeds + 1);
      
      await propertyRef.update({
        availableBeds: newAvailableBeds,
        updated_at: new Date()
      });
    }
  }
  
  return roomData.bedsArray[bedIndex];
};

// Update bed rent
const updateBedRent = async (roomId, bedNumber, newRent, ownerId) => {
  const roomRef = db.collection(C.ROOM_COLLECTION).doc(roomId);
  const roomDoc = await roomRef.get();
  
  if (!roomDoc.exists || roomDoc.data().ownerId !== ownerId) {
    throw new Error("Unauthorized or Room not found");
  }
  
  const roomData = roomDoc.data();
  const bedIndex = roomData.bedsArray.findIndex(bed => bed.bedNumber === bedNumber);
  
  if (bedIndex === -1) {
    throw new Error("Bed not found");
  }
  
  roomData.bedsArray[bedIndex].rent = newRent;
  
  await roomRef.update(roomData);
  return roomData.bedsArray[bedIndex];
};

module.exports = {
  createRoom,
  createMultipleRooms,
  updateRoom,
  getAllRooms,
  getRoomById,
  deleteRoom,
  getLastRoomNumber,
  getAvailableBeds,
  assignBedToTenant,
  releaseBedFromTenant,
  updateBedRent,
};
