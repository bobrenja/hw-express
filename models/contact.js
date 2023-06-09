const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../utils');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

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
  favorite: Joi.boolean(),

  // Joi.string().pattern(//)
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const shemas = {
  addSchema,
  favoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = { Contact, shemas };
