const express = require('express');

const validateBody = require('../../utils/validateBody');
const {shemas} = require('../../models/contact');
const ctrl = require('../../controllers/contacts-controller');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getIdContact);

router.post('/', validateBody(shemas.addSchema), ctrl.addOneContact);

router.delete('/:contactId', ctrl.removeOneContact);

router.put(
  '/:contactId',
  validateBody(shemas.addSchema),
  ctrl.updateOneContact
);

module.exports = router;
