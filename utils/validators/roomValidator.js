const Joi = require("joi");

const createRoomSchema = Joi.object({
  roomNumber: Joi.number().required(),
  propertyId: Joi.string().required(),
  ownerId: Joi.string().required(),
  beds: Joi.number().integer().positive().required(),
  availableBeds: Joi.number().integer().min(0).required(),
  defaultRent: Joi.number().positive().required(),
  bedsArray: Joi.array().items(Joi.object({
    bedNumber: Joi.number().integer().positive().required(),
    rent: Joi.number().positive().required(),
    isOccupied: Joi.boolean().default(false),
    tenantId: Joi.string().allow(null),
    occupiedAt: Joi.date().allow(null)
  })).optional()
}).unknown(true);

const updateRoomSchema = Joi.object({
  roomNumber: Joi.number(),
  beds: Joi.number().integer().positive(),
  availableBeds: Joi.number().integer().min(0),
  defaultRent: Joi.number().positive(),
  bedsArray: Joi.array().items(Joi.object({
    bedNumber: Joi.number().integer().positive().required(),
    rent: Joi.number().positive().required(),
    isOccupied: Joi.boolean(),
    tenantId: Joi.string().allow(null),
    occupiedAt: Joi.date().allow(null)
  })),
  ownerId: Joi.string().required()
}).unknown(true);

module.exports = {
  validateCreateRoom: (data) => createRoomSchema.validate(data),
  validateUpdateRoom: (data) => updateRoomSchema.validate(data),
};
