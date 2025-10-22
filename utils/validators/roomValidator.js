const Joi = require("joi");

const createRoomSchema = Joi.object({
  roomNumber: Joi.number().required(),
  propertyId: Joi.string().required(),
  ownerId: Joi.string().required()
}).unknown(true);;

const updateRoomSchema = Joi.object({
  roomNumber: Joi.number(),
  beds: Joi.number(),
  ownerId: Joi.string().required(),
  roomId: Joi.string().required()
}).unknown(true);

module.exports = {
  validateCreateRoom: (data) => createRoomSchema.validate(data),
  validateUpdateRoom: (data) => updateRoomSchema.validate(data),
};
