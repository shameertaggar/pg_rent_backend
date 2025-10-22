const Joi = require('joi');

// Schema for creating a booking
const createBookingSchema = Joi.object({
  propertyId: Joi.string().required(),
  tenantId: Joi.string().required(),
  roomId: Joi.string().required(),
  booking_date: Joi.date().default(Date.now),
  checkIn_date: Joi.date().required(),
  checkOut_date: Joi.date().allow(null),
  rent_amount: Joi.number().positive().required(),
  deposit_amount: Joi.number().min(0).required(),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled').default('pending'),
  ownerId: Joi.string().required()
}).unknown(true);

// Schema for updating a booking (all optional)
const updateBookingSchema = Joi.object({
  propertyId: Joi.string(),
  tenantId: Joi.string(),
  roomId: Joi.string(),
  checkIn_date: Joi.date(),
  checkOut_date: Joi.date().allow(null),
  rent_amount: Joi.number().positive(),
  deposit_amount: Joi.number().min(0),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled'),
  ownerId: Joi.string().required()
}).unknown(true);

const validateCreateBooking = (data) => createBookingSchema.validate(data);
const validateUpdateBooking = (data) => updateBookingSchema.validate(data);

module.exports = {
  validateCreateBooking,
  validateUpdateBooking,
};
