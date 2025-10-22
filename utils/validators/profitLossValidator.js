const Joi = require("joi");

// Schema for profit/loss analysis filters
const profitLossFiltersSchema = Joi.object({
  startDate: Joi.date().iso().messages({
    'date.format': 'Start date must be in ISO format (YYYY-MM-DD)',
    'date.base': 'Start date must be a valid date'
  }),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).messages({
    'date.format': 'End date must be in ISO format (YYYY-MM-DD)',
    'date.base': 'End date must be a valid date',
    'date.min': 'End date must be after start date'
  }),
  propertyId: Joi.string().messages({
    'string.base': 'Property ID must be a string'
  }),
  category: Joi.string().messages({
    'string.base': 'Category must be a string'
  }),
  period: Joi.string().valid('current_month', 'last_month', 'current_year', 'last_year').messages({
    'any.only': 'Period must be one of: current_month, last_month, current_year, last_year'
  }),
  months: Joi.number().integer().min(1).max(24).messages({
    'number.base': 'Months must be a number',
    'number.integer': 'Months must be a whole number',
    'number.min': 'Months must be at least 1',
    'number.max': 'Months cannot exceed 24'
  })
}).unknown(true);

// Schema for property-specific analysis
const propertyAnalysisSchema = Joi.object({
  propertyId: Joi.string().required().messages({
    'string.base': 'Property ID must be a string',
    'any.required': 'Property ID is required'
  })
});

// Schema for monthly trends
const monthlyTrendsSchema = Joi.object({
  months: Joi.number().integer().min(1).max(24).default(12).messages({
    'number.base': 'Months must be a number',
    'number.integer': 'Months must be a whole number',
    'number.min': 'Months must be at least 1',
    'number.max': 'Months cannot exceed 24'
  })
});

// Validation functions
const validateProfitLossFilters = (data) => profitLossFiltersSchema.validate(data);
const validatePropertyAnalysis = (data) => propertyAnalysisSchema.validate(data);
const validateMonthlyTrends = (data) => monthlyTrendsSchema.validate(data);

module.exports = {
  validateProfitLossFilters,
  validatePropertyAnalysis,
  validateMonthlyTrends
};
