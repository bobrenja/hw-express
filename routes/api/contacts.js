const express = require('express');

const ctrl = require('../../controllers/contacts-controller');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getIdContact);

router.post('/', ctrl.addOneContact);

router.delete('/:contactId', ctrl.removeOneContact);

router.put('/:contactId', ctrl.updateOneContact);

module.exports = router;
