const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers/index');

const isValidId = async (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, `${contactId} invalid`));
  }
  next();
};

module.exports = isValidId;
