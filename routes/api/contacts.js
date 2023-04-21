const express = require('express');

const validateBody = require('../../utils/validateBody');
const { shemas } = require('../../models/contact');
const ctrl = require('../../controllers/contacts-controller');
const { isValidId, authIsValidToken } = require('../../middlewares');

const router = express.Router();

router.get('/', authIsValidToken, ctrl.getAllContacts);

router.get('/:contactId', authIsValidToken, isValidId, ctrl.getIdContact);

router.post(
  '/',
  authIsValidToken,
  validateBody(shemas.addSchema),
  ctrl.addOneContact
);

router.patch(
  '/:contactId/favorite',
  authIsValidToken,
  isValidId,
  validateBody(shemas.favoriteSchema),
  ctrl.updateFavoriteContact
);

router.delete(
  '/:contactId',
  authIsValidToken,
  isValidId,
  ctrl.removeOneContact
);

router.put(
  '/:contactId',
  authIsValidToken,
  isValidId,
  validateBody(shemas.addSchema),
  ctrl.updateOneContact
);

module.exports = router;
