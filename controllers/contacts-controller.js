const { HttpError } = require('../models/helpers');
const { ctrlWrapper } = require('../utils');

const {Contact} = require("../models/contact")
const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const getAllContacts = async (req, res) => {
  console.log("FIND")
  const data = await Contact.find({});
  console.log(data)
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
