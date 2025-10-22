const Joi = require('joi');

// Schema for creating an expense
const createExpenseSchema = Joi.object({
  propertyId: Joi.string().required(),
  category: Joi.string().valid('maintenance', 'utilities', 'repairs', 'supplies', 'staff', 'other').required(),
  description: Joi.string().min(3).max(500).required(),
  amount: Joi.number().positive().required(),
  expense_date: Joi.date().default(Date.now),
  payment_method: Joi.string().valid('cash', 'bank_transfer', 'upi', 'cheque').required(),
  vendor: Joi.string().allow(''),
  receipt_number: Joi.string().allow(''),
  ownerId: Joi.string().required()
}).unknown(true);

// Schema for updating an expense
const updateExpenseSchema = Joi.object({
  category: Joi.string().valid('maintenance', 'utilities', 'repairs', 'supplies', 'staff', 'other'),
  description: Joi.string().min(3).max(500),
  amount: Joi.number().positive(),
  expense_date: Joi.date(),
  payment_method: Joi.string().valid('cash', 'bank_transfer', 'upi', 'cheque'),
  vendor: Joi.string().allow(''),
  receipt_number: Joi.string().allow(''),
  ownerId: Joi.string().required()
}).unknown(true);

const validateCreateExpense = (data) => createExpenseSchema.validate(data);
const validateUpdateExpense = (data) => updateExpenseSchema.validate(data);

module.exports = {
  validateCreateExpense,
  validateUpdateExpense,
};
