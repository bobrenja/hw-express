const express = require('express');
const Joi = require('joi');

const { HttpError } = require('../../models/helpers');

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();
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

router.get('/', async (req, res, next) => {
  try {
    const data = await getContacts();

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    console.log(contactId);
    if (!data) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const data = await addContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await removeContact(contactId);
    if (!data) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.status(200).json({
      message: 'Contact deleted',
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

module.exports = router;
