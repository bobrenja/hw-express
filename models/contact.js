const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = new Schema({
  name: { type: String, required: [true, 'title must be exist'] },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

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

const shemas = {
  addSchema,
};

const Contact = model('contact', contactSchema);

module.exports = { Contact, shemas };
