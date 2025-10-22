const BookingModel = require("../models/bookingModel");
const { validateCreateBooking, validateUpdateBooking } = require("../utils/validators/bookingValidator");
const { db } = require("../config/firebase");
const { Constants: C } = require("../utils/constants");

exports.createBooking = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const bookingData = {
      ...req.body,
      ownerId
    };
    
    const { error } = validateCreateBooking(bookingData);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    // Validate that property, tenant, and room exist and belong to owner
    await BookingModel.validateProperty(bookingData.propertyId, ownerId);
    await BookingModel.validateTenant(bookingData.tenantId, ownerId);
    await BookingModel.validateRoom(bookingData.roomId, ownerId);
    
    const bookingId = await BookingModel.createBooking(bookingData);
    res.status(201).json({ id: bookingId });
  } catch (error) {
    // Return 400 for validation errors, 500 for server errors
    const statusCode = error.message.includes('not found') || 
                      error.message.includes('does not belong') || 
                      error.message.includes('Unauthorized') ? 400 : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const bookings = await BookingModel.getAllBookings(ownerId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const booking = await BookingModel.getBookingById(req.params.id, ownerId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const updateData = {
      ...req.body,
      ownerId
    };
    
    const { error } = validateUpdateBooking(updateData);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    await BookingModel.updateBooking(req.params.id, req.body, ownerId);
    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    // Return 400 for validation errors, 500 for server errors
    const statusCode = error.message.includes('not found') || 
                      error.message.includes('does not belong') || 
                      error.message.includes('Unauthorized') ? 400 : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    await BookingModel.deleteBooking(req.params.id, ownerId);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Filter bookings by various criteria
exports.filterBookings = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const filters = req.query;
    
    // Convert string values to appropriate types
    if (filters.minRentAmount) filters.minRentAmount = parseFloat(filters.minRentAmount);
    if (filters.maxRentAmount) filters.maxRentAmount = parseFloat(filters.maxRentAmount);
    if (filters.minDepositAmount) filters.minDepositAmount = parseFloat(filters.minDepositAmount);
    if (filters.maxDepositAmount) filters.maxDepositAmount = parseFloat(filters.maxDepositAmount);
    if (filters.limit) filters.limit = parseInt(filters.limit);
    if (filters.offset) filters.offset = parseInt(filters.offset);
    
    const bookings = await BookingModel.filterBookings(ownerId, filters);
    res.status(200).json({
      bookings,
      totalCount: bookings.length,
      filters: filters
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') || 
                      error.message.includes('does not belong') || 
                      error.message.includes('Unauthorized') ? 400 : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

// Get booking statistics
exports.getBookingStats = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const filters = req.query;
    
    // Convert string values to appropriate types
    if (filters.minRentAmount) filters.minRentAmount = parseFloat(filters.minRentAmount);
    if (filters.maxRentAmount) filters.maxRentAmount = parseFloat(filters.maxRentAmount);
    if (filters.minDepositAmount) filters.minDepositAmount = parseFloat(filters.minDepositAmount);
    if (filters.maxDepositAmount) filters.maxDepositAmount = parseFloat(filters.maxDepositAmount);
    
    const stats = await BookingModel.getBookingStats(ownerId, filters);
    res.status(200).json({
      stats,
      filters: filters
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') || 
                      error.message.includes('does not belong') || 
                      error.message.includes('Unauthorized') ? 400 : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

// Search bookings by tenant name or property name
exports.searchBookings = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const { searchTerm } = req.query;
    
    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }
    
    // Get all bookings first
    const allBookings = await BookingModel.getAllBookings(ownerId);
    
    // Get property and tenant details for search
    const propertyIds = [...new Set(allBookings.map(booking => booking.propertyId))];
    const tenantIds = [...new Set(allBookings.map(booking => booking.tenantId))];
    
    // Get property names
    const propertyPromises = propertyIds.map(async (propertyId) => {
      const propertyDoc = await db.collection(C.PROPERTY_COLLECTION).doc(propertyId).get();
      return propertyDoc.exists ? { id: propertyId, name: propertyDoc.data().propertyName } : null;
    });
    
    // Get tenant names
    const tenantPromises = tenantIds.map(async (tenantId) => {
      const tenantDoc = await db.collection(C.TENANT_COLLECTION).doc(tenantId).get();
      return tenantDoc.exists ? { id: tenantId, name: tenantDoc.data().name } : null;
    });
    
    const [properties, tenants] = await Promise.all([
      Promise.all(propertyPromises),
      Promise.all(tenantPromises)
    ]);
    
    const propertyMap = properties.filter(p => p).reduce((acc, prop) => {
      acc[prop.id] = prop.name;
      return acc;
    }, {});
    
    const tenantMap = tenants.filter(t => t).reduce((acc, tenant) => {
      acc[tenant.id] = tenant.name;
      return acc;
    }, {});
    
    // Filter bookings based on search term
    const filteredBookings = allBookings.filter(booking => {
      const propertyName = propertyMap[booking.propertyId] || '';
      const tenantName = tenantMap[booking.tenantId] || '';
      
      return propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             tenantName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    res.status(200).json({
      bookings: filteredBookings,
      totalCount: filteredBookings.length,
      searchTerm: searchTerm
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
