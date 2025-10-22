const Joi = require('joi');

// Schema for creating an issue
const createIssueSchema = Joi.object({
  propertyId: Joi.string().required(),
  roomId: Joi.string().allow(''),
  tenantId: Joi.string().allow(''),
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).max(1000).required(),
  category: Joi.string().valid('plumbing', 'electrical', 'maintenance', 'cleaning', 'security', 'other').required(),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').default('medium'),
  reported_by: Joi.string().min(3).max(100).required(),
  contact_number: Joi.string().pattern(/^[0-9]{10}$/).required(),
  ownerId: Joi.string().required()
}).unknown(true);

// Schema for updating an issue
const updateIssueSchema = Joi.object({
  title: Joi.string().min(3).max(200),
  description: Joi.string().min(10).max(1000),
  category: Joi.string().valid('plumbing', 'electrical', 'maintenance', 'cleaning', 'security', 'other'),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
  status: Joi.string().valid('pending', 'in_progress', 'resolved', 'cancelled'),
  assigned_to: Joi.string().allow(''),
  resolution_notes: Joi.string().allow(''),
  ownerId: Joi.string().required()
}).unknown(true);

const validateCreateIssue = (data) => createIssueSchema.validate(data);
const validateUpdateIssue = (data) => updateIssueSchema.validate(data);

module.exports = {
  validateCreateIssue,
  validateUpdateIssue,
};
