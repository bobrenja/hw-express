const bcrypt = require('bcryptjs');
const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../utils');

const { User } = require('../models/user');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'E-mail in use!');
  }

  const hashPasw = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPasw });

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
