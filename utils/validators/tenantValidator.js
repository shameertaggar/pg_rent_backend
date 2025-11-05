const Joi = require("joi");

const createTenantSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(10).max(500).required(),
  emergency_contact: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
  emergency_contact_name: Joi.string().min(3).max(100).required(),
  id_proof_type: Joi.string().valid('aadhar', 'pan', 'voter_id', 'driving_license').required(),
  id_proof_number: Joi.string().min(5).max(20).required(),
  dob: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'any.required': 'Date of birth is required'
  }),
  propertyId: Joi.string().required(),
  propertyName: Joi.string().required(),
  ownerId: Joi.string().required(),
  status: Joi.string().required(),
  // Bed assignment fields (optional)
  roomId: Joi.string().allow(''),
  bedNumber: Joi.number().integer().positive().allow(null),
  customRent: Joi.number().positive().allow(null),
  checkIn: Joi.date().default(Date.now),
  checkOut: Joi.date().allow(null)
}).unknown(true);

const updateTenantSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/),
  email: Joi.string().email(),
  address: Joi.string().min(10).max(500),
  emergency_contact: Joi.string().pattern(/^[6-9]\d{9}$/),
  emergency_contact_name: Joi.string().min(3).max(100),
  id_proof_type: Joi.string().valid('aadhar', 'pan', 'voter_id', 'driving_license'),
  id_proof_number: Joi.string().min(5).max(20),
  dob: Joi.date().messages({
    'date.base': 'Date of birth must be a valid date'
  }),
  propertyId: Joi.string(),
  propertyName: Joi.string(),
  ownerId: Joi.string().required(),
  // Bed assignment fields (optional)
  roomId: Joi.string().allow(''),
  bedNumber: Joi.number().integer().positive().allow(null),
  customRent: Joi.number().positive().allow(null),
  checkIn: Joi.date(),
  checkOut: Joi.date().allow(null)
}).unknown(true);

// Schema for tenant authentication
const tenantAuthSchema = Joi.object({
  tenantCode: Joi.string().length(8).pattern(/^[A-Z0-9]+$/).required().messages({
    'string.length': 'Tenant code must be exactly 8 characters',
    'string.pattern.base': 'Tenant code must contain only uppercase letters and numbers',
    'any.required': 'Tenant code is required'
  }),
  dob: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'any.required': 'Date of birth is required'
  })
});

// Schema for updating checkout date
const checkoutUpdateSchema = Joi.object({
  checkoutDate: Joi.date().required().messages({
    'date.base': 'Checkout date must be a valid date',
    'any.required': 'Checkout date is required'
  })
});

module.exports = {
  validateCreateTenant: (data) => createTenantSchema.validate(data),
  validateUpdateTenant: (data) => updateTenantSchema.validate(data),
  validateTenantAuth: (data) => tenantAuthSchema.validate(data),
  validateCheckoutUpdate: (data) => checkoutUpdateSchema.validate(data),
};
