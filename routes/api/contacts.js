const express = require('express');

const validateBody = require('../../utils/validateBody');
const { shemas } = require('../../models/contact');
const ctrl = require('../../controllers/contacts-controller');
const { isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', isValidId, ctrl.getIdContact);

router.post('/', validateBody(shemas.addSchema), ctrl.addOneContact);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(shemas.favoriteSchema),
  ctrl.updateFavoriteContact
);

router.delete('/:contactId', isValidId, ctrl.removeOneContact);

router.put(
  '/:contactId',
  isValidId,
  validateBody(shemas.addSchema),
  ctrl.updateOneContact
);

module.exports = router;
