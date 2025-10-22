const Joi = require('joi');

// Schema for creating a food entry
const createFoodSchema = Joi.object({
  propertyId: Joi.string().required(),
  date: Joi.date().required(),
  meal_type: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snacks').required(),
  menu_items: Joi.array().items(Joi.string()).min(1).required(),
  cost_per_person: Joi.number().positive().required(),
  total_cost: Joi.number().positive().required(),
  people_prepared_for: Joi.number().integer().positive().required().messages({
    'number.base': 'People prepared for must be a number',
    'number.integer': 'People prepared for must be a whole number',
    'number.positive': 'People prepared for must be greater than 0',
    'any.required': 'People prepared for is required'
  }),
  people_actually_ate: Joi.number().integer().min(0).required().messages({
    'number.base': 'People who actually ate must be a number',
    'number.integer': 'People who actually ate must be a whole number',
    'number.min': 'People who actually ate cannot be negative',
    'any.required': 'People who actually ate is required'
  }),
  prepared_by: Joi.string().allow(''),
  notes: Joi.string().allow(''),
  ownerId: Joi.string().required()
}).unknown(true);

// Schema for updating a food entry
const updateFoodSchema = Joi.object({
  date: Joi.date(),
  meal_type: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snacks'),
  menu_items: Joi.array().items(Joi.string()).min(1),
  cost_per_person: Joi.number().positive(),
  total_cost: Joi.number().positive(),
  people_prepared_for: Joi.number().integer().positive().messages({
    'number.base': 'People prepared for must be a number',
    'number.integer': 'People prepared for must be a whole number',
    'number.positive': 'People prepared for must be greater than 0'
  }),
  people_actually_ate: Joi.number().integer().min(0).messages({
    'number.base': 'People who actually ate must be a number',
    'number.integer': 'People who actually ate must be a whole number',
    'number.min': 'People who actually ate cannot be negative'
  }),
  prepared_by: Joi.string().allow(''),
  notes: Joi.string().allow(''),
  ownerId: Joi.string().required()
}).unknown(true);

const validateCreateFood = (data) => createFoodSchema.validate(data);
const validateUpdateFood = (data) => updateFoodSchema.validate(data);

module.exports = {
  validateCreateFood,
  validateUpdateFood,
};
