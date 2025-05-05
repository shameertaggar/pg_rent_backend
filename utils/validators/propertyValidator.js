const Joi = require('joi');

// Schema for creating a property
const createPropertySchema = Joi.object({
  propertyName: Joi.string().min(3).max(100).required(),
  location: Joi.string().min(3).required(),
  totalRooms: Joi.number().integer().positive().required(),
  availableBeds: Joi.number().integer().min(0).required(),
  rentPerBed: Joi.number().positive().required(),
  facilities: Joi.array().items(Joi.string()).required(), // e.g., ["WiFi", "AC"]
  ownerName: Joi.string().min(3).max(100).required(),
  type: Joi.string().valid('PG','Hostel','Apartment').required(),
  ownerId: Joi.string().required(),
  contactNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': `contactNumber must be a 10-digit number`,
    }),
}).unknown(true);

// Schema for updating a property (all optional)
const updatePropertySchema = Joi.object({
  propertyName: Joi.string().min(3).max(100),
  location: Joi.string().min(3),
  totalRooms: Joi.number().integer().positive(),
  availableBeds: Joi.number().integer().min(0),
  rentPerBed: Joi.number().positive(),
  facilities: Joi.array().items(Joi.string()),
  type: Joi.string().valid('PG','Hostel','Apartment'),
  ownerName: Joi.string().min(3).max(100),
  ownerId: Joi.string().required(),
  contactNumber: Joi.string().pattern(/^[0-9]{10}$/).messages({
    'string.pattern.base': `contactNumber must be a 10-digit number`,
  }),
}).unknown(true);

const validateCreateProperty = (data) => createPropertySchema.validate(data);
const validateUpdateProperty = (data) => updatePropertySchema.validate(data);

module.exports = {
  validateCreateProperty,
  validateUpdateProperty,
};
