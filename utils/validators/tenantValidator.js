const Joi = require("joi");

const createTenantSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
  email: Joi.string().email().required(),
  propertyId: Joi.string().required(),
  propertyName: Joi.string().required(),
  roomId: Joi.string().required(),
  bedNo: Joi.number().required(),
  checkIn: Joi.date().required(),
  rentDue: Joi.date().required(),
  rentPaid: Joi.number().required(),
  status: Joi.string().valid("active", "left", "pending").required(),
}).unknown(true);

const updateTenantSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/),
  email: Joi.string().email(),
  roomId: Joi.string(),
  bedNo: Joi.number(),
  checkOut: Joi.date(),
  rentDue: Joi.date(),
  rentPaid: Joi.number(),
  status: Joi.string().valid("active", "left", "pending"),
}).unknown(true);

module.exports = {
  validateCreateTenant: (data) => createTenantSchema.validate(data),
  validateUpdateTenant: (data) => updateTenantSchema.validate(data),
};
