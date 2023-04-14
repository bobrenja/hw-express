const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `"name" is required`,
  }),
  email: Joi.string().required().messages({
    'any.required': `"email" is required`,
    'string.empty': `"email" cannot be empty`,
    'string.base': `"email" must be string`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `"phone" is required`,
  }),
  // Joi.string().pattern(//)
});

module.exports = {
  addSchema,
};
