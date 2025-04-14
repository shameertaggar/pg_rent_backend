const { db } = require("../config/firebase");

const BOOKING_COLLECTION = "Bookings";

const BookingModel = {
  async createBooking(data) {
    const docRef = await db.collection(BOOKING_COLLECTION).add({
      ...data,
      booking_date: data.booking_date || new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    return docRef.id;
  },

  async getAllBookings() {
    const snapshot = await db.collection(BOOKING_COLLECTION).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getBookingById(id) {
    const doc = await db.collection(BOOKING_COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async updateBooking(id, data) {
    await db.collection(BOOKING_COLLECTION).doc(id).update({
      ...data,
      updated_at: new Date(),
    });
  },

  async deleteBooking(id) {
    await db.collection(BOOKING_COLLECTION).doc(id).delete();
  }
};

module.exports = BookingModel;
