const express = require('express');
const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const data = await getContacts();
  res.json(data);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  res.json(data);
});

router.post('/', async (req, res, next) => {
  const data = await addContact(req.body);
  res.json(data);
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const data = removeContact(contactId);
  res.status(200).json({
    message: 'Contact deleted',
  });
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);

  res.json(data);
});

module.exports = router;
