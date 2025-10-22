const { db } = require("../config/firebase");
const { Constants: C } = require("../utils/constants");

const BOOKING_COLLECTION = "Bookings";

const BookingModel = {
  // Validate if property exists and belongs to owner
  async validateProperty(propertyId, ownerId) {
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(propertyId).get();
    
    if (!propertyDoc.exists) {
      throw new Error("Property not found");
    }
    
    const propertyData = propertyDoc.data();
    if (propertyData.ownerId !== ownerId) {
      throw new Error("Property does not belong to this owner");
    }
    
    return true;
  },

  // Validate if tenant exists and belongs to owner's property
  async validateTenant(tenantId, ownerId) {
    const tenantDoc = await db.collection(C.TENANT_COLLECTION).doc(tenantId).get();
    
    if (!tenantDoc.exists) {
      throw new Error("Tenant not found");
    }
    
    const tenantData = tenantDoc.data();
    
    // Check if the tenant's property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(tenantData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Tenant does not belong to this owner's property");
    }
    
    return true;
  },

  // Validate if room exists and belongs to owner's property
  async validateRoom(roomId, ownerId) {
    const roomDoc = await db.collection(C.ROOM_COLLECTION).doc(roomId).get();
    
    if (!roomDoc.exists) {
      throw new Error("Room not found");
    }
    
    const roomData = roomDoc.data();
    
    // Check if the room's property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(roomData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Room does not belong to this owner's property");
    }
    
    return true;
  },

  async createBooking(data) {
    const docRef = await db.collection(BOOKING_COLLECTION).add({
      ...data,
      booking_date: data.booking_date || new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    return docRef.id;
  },

  async getAllBookings(ownerId) {
    // Get all properties owned by this owner
    const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();

    const propertyIds = propertySnapshot.docs.map(doc => doc.id);

    // Get bookings associated with these property IDs
    const bookingSnapshot = await db.collection(BOOKING_COLLECTION)
      .where(C.PROPERTY_ID, "in", propertyIds.length > 0 ? propertyIds : ["none"])
      .get();

    return bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Filter bookings by various criteria
  async filterBookings(ownerId, filters = {}) {
    // Get all properties owned by this owner
    const propertySnapshot = await db.collection(C.PROPERTY_COLLECTION)
      .where(C.OWNER_ID, "==", ownerId)
      .get();

    const propertyIds = propertySnapshot.docs.map(doc => doc.id);

    if (propertyIds.length === 0) {
      return [];
    }

    let query = db.collection(BOOKING_COLLECTION)
      .where(C.PROPERTY_ID, "in", propertyIds);

    // Apply filters
    if (filters.status) {
      query = query.where('status', '==', filters.status);
    }

    if (filters.propertyId) {
      // Validate that the property belongs to the owner
      if (propertyIds.includes(filters.propertyId)) {
        query = query.where(C.PROPERTY_ID, '==', filters.propertyId);
      } else {
        throw new Error("Property does not belong to this owner");
      }
    }

    if (filters.tenantId) {
      query = query.where('tenantId', '==', filters.tenantId);
    }

    if (filters.roomId) {
      query = query.where('roomId', '==', filters.roomId);
    }

    if (filters.checkInDateFrom) {
      query = query.where('checkIn_date', '>=', new Date(filters.checkInDateFrom));
    }

    if (filters.checkInDateTo) {
      query = query.where('checkIn_date', '<=', new Date(filters.checkInDateTo));
    }

    if (filters.checkOutDateFrom) {
      query = query.where('checkOut_date', '>=', new Date(filters.checkOutDateFrom));
    }

    if (filters.checkOutDateTo) {
      query = query.where('checkOut_date', '<=', new Date(filters.checkOutDateTo));
    }

    if (filters.bookingDateFrom) {
      query = query.where('booking_date', '>=', new Date(filters.bookingDateFrom));
    }

    if (filters.bookingDateTo) {
      query = query.where('booking_date', '<=', new Date(filters.bookingDateTo));
    }

    if (filters.minRentAmount) {
      query = query.where('rent_amount', '>=', filters.minRentAmount);
    }

    if (filters.maxRentAmount) {
      query = query.where('rent_amount', '<=', filters.maxRentAmount);
    }

    if (filters.minDepositAmount) {
      query = query.where('deposit_amount', '>=', filters.minDepositAmount);
    }

    if (filters.maxDepositAmount) {
      query = query.where('deposit_amount', '<=', filters.maxDepositAmount);
    }

    // Apply sorting
    const sortBy = filters.sortBy || 'created_at';
    const sortOrder = filters.sortOrder || 'desc';
    query = query.orderBy(sortBy, sortOrder);

    // Apply pagination
    if (filters.limit) {
      query = query.limit(parseInt(filters.limit));
    }

    if (filters.offset) {
      query = query.offset(parseInt(filters.offset));
    }

    const bookingSnapshot = await query.get();
    return bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Get booking statistics
  async getBookingStats(ownerId, filters = {}) {
    const bookings = await this.filterBookings(ownerId, filters);
    
    const stats = {
      totalBookings: bookings.length,
      statusBreakdown: {},
      totalRentAmount: 0,
      totalDepositAmount: 0,
      averageRentAmount: 0,
      averageDepositAmount: 0,
      dateRange: {
        earliestCheckIn: null,
        latestCheckIn: null,
        earliestCheckOut: null,
        latestCheckOut: null
      }
    };

    if (bookings.length === 0) {
      return stats;
    }

    // Calculate statistics
    bookings.forEach(booking => {
      // Status breakdown
      const status = booking.status || 'unknown';
      stats.statusBreakdown[status] = (stats.statusBreakdown[status] || 0) + 1;

      // Financial totals
      stats.totalRentAmount += booking.rent_amount || 0;
      stats.totalDepositAmount += booking.deposit_amount || 0;

      // Date ranges
      if (booking.checkIn_date) {
        const checkInDate = new Date(booking.checkIn_date);
        if (!stats.dateRange.earliestCheckIn || checkInDate < stats.dateRange.earliestCheckIn) {
          stats.dateRange.earliestCheckIn = checkInDate;
        }
        if (!stats.dateRange.latestCheckIn || checkInDate > stats.dateRange.latestCheckIn) {
          stats.dateRange.latestCheckIn = checkInDate;
        }
      }

      if (booking.checkOut_date) {
        const checkOutDate = new Date(booking.checkOut_date);
        if (!stats.dateRange.earliestCheckOut || checkOutDate < stats.dateRange.earliestCheckOut) {
          stats.dateRange.earliestCheckOut = checkOutDate;
        }
        if (!stats.dateRange.latestCheckOut || checkOutDate > stats.dateRange.latestCheckOut) {
          stats.dateRange.latestCheckOut = checkOutDate;
        }
      }
    });

    // Calculate averages
    stats.averageRentAmount = stats.totalRentAmount / bookings.length;
    stats.averageDepositAmount = stats.totalDepositAmount / bookings.length;

    return stats;
  },

  async getBookingById(id, ownerId) {
    const doc = await db.collection(BOOKING_COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    
    const bookingData = doc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(bookingData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) return null;

    return { id: doc.id, ...bookingData };
  },

  async updateBooking(id, data, ownerId) {
    const bookingRef = db.collection(BOOKING_COLLECTION).doc(id);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) {
      throw new Error("Booking not found");
    }

    const bookingData = bookingDoc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(bookingData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    // Validate property, tenant, and room if they're being updated
    if (data.propertyId) {
      await this.validateProperty(data.propertyId, ownerId);
    }
    if (data.tenantId) {
      await this.validateTenant(data.tenantId, ownerId);
    }
    if (data.roomId) {
      await this.validateRoom(data.roomId, ownerId);
    }

    await bookingRef.update({
      ...data,
      updated_at: new Date(),
    });
  },

  async deleteBooking(id, ownerId) {
    const bookingRef = db.collection(BOOKING_COLLECTION).doc(id);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) {
      throw new Error("Booking not found");
    }

    const bookingData = bookingDoc.data();
    
    // Check if the property belongs to the owner
    const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(bookingData.propertyId).get();
    if (!propertyDoc.exists || propertyDoc.data().ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }

    await bookingRef.delete();
  }
};

module.exports = BookingModel;
