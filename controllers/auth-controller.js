const { HttpError } = require('../models/helpers');
const { ctrlWrapper } = require('../utils');

const { User } = require('../models/user');

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'E-mail in use!');
  }
  const result = await User.create(req.body);

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
