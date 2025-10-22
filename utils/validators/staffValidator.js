const Joi = require('joi');

// Schema for creating a staff member
const createStaffSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  address: Joi.string().min(10).max(500).required(),
  position: Joi.string().valid('manager', 'caretaker', 'cleaner', 'cook', 'security', 'other').required(),
  salary: Joi.number().positive().required(),
  joining_date: Joi.date().required(),
  emergency_contact: Joi.string().pattern(/^[0-9]{10}$/).required(),
  emergency_contact_name: Joi.string().min(3).max(100).required(),
  id_proof_type: Joi.string().valid('aadhar', 'pan', 'voter_id', 'driving_license').required(),
  id_proof_number: Joi.string().min(5).max(20).required(),
  ownerId: Joi.string().required()
}).unknown(true);

// Schema for updating a staff member
const updateStaffSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
  address: Joi.string().min(10).max(500),
  position: Joi.string().valid('manager', 'caretaker', 'cleaner', 'cook', 'security', 'other'),
  salary: Joi.number().positive(),
  joining_date: Joi.date(),
  emergency_contact: Joi.string().pattern(/^[0-9]{10}$/),
  emergency_contact_name: Joi.string().min(3).max(100),
  id_proof_type: Joi.string().valid('aadhar', 'pan', 'voter_id', 'driving_license'),
  id_proof_number: Joi.string().min(5).max(20),
  ownerId: Joi.string().required()
}).unknown(true);

const validateCreateStaff = (data) => createStaffSchema.validate(data);
const validateUpdateStaff = (data) => updateStaffSchema.validate(data);

module.exports = {
  validateCreateStaff,
  validateUpdateStaff,
};
