const Joi = require('joi');

const { ctrlWrapper } = require('../utils');

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const { HttpError } = require('../models/helpers');

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

const getAllContacts = async (req, res) => {
  const data = await getContacts();
  res.json(data);
};

const getIdContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(data);
};

const addOneContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const data = await addContact(req.body);
  res.status(201).json(data);
};

const removeOneContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.status(200).json({
    message: 'Contact deleted',
  });
};

const updateOneContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);
  if (!data) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json(data);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getIdContact: ctrlWrapper(getIdContact),
  addOneContact: ctrlWrapper(addOneContact),
  removeOneContact: ctrlWrapper(removeOneContact),
  updateOneContact: ctrlWrapper(updateOneContact),
};
