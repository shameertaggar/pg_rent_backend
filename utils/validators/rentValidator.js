const Joi = require("joi");

// Schema for creating a rent record
const createRentSchema = Joi.object({
  propertyId: Joi.string().required(),
  tenantId: Joi.string().required(),
  roomId: Joi.string().allow(""),
  bedNumber: Joi.number().integer().positive().allow(null),
  amount_paid: Joi.number().positive().required(),
  payment_date: Joi.date().default(Date.now),
  due_date: Joi.date().required(),
  payment_method: Joi.string()
    .valid("cash", "bank_transfer", "upi", "cheque")
    .required(),
  status: Joi.string().valid("pending", "paid", "overdue").default("pending"),
  remarks: Joi.string().allow(""),
  ownerId: Joi.string().required(),
}).unknown(true);

// Schema for updating a rent record
const updateRentSchema = Joi.object({
  amount_paid: Joi.number().positive(),
  payment_date: Joi.date(),
  due_date: Joi.date(),
  payment_method: Joi.string().valid("cash", "bank_transfer", "upi", "cheque"),
  status: Joi.string().valid("pending", "paid", "overdue"),
  remarks: Joi.string().allow(""),
  roomId: Joi.string().allow(""),
  bedNumber: Joi.number().integer().positive().allow(null),
  ownerId: Joi.string().required(),
}).unknown(true);

const validateCreateRent = (data) => createRentSchema.validate(data);
const validateUpdateRent = (data) => updateRentSchema.validate(data);

module.exports = {
  validateCreateRent,
  validateUpdateRent,
};
