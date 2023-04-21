const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../utils');

const { Contact } = require('../models/contact');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const data = await Contact.find({ owner }, '-__v').populate(
    'owner',
    'name email'
  );
  res.json(data);
};

const getIdContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(data);
};

const addOneContact = async (req, res) => {
  console.log(req.user);
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });
  res.status(201).json(data);
};

const removeOneContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndDelete(contactId);
  if (!data) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.status(200).json({
    message: 'Contact deleted',
  });
};

const updateOneContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json(data);
};

const updateFavoriteContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
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
  updateFavoriteContact: ctrlWrapper(updateFavoriteContact),
};
