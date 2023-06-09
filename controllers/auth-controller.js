const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../utils');

const { User } = require('../models/user');
const { SECRET_KEY } = process.env;

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

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'E-mail or user invalid');
  }

  const passwCompare = bcrypt.compare(password, user.password);
  if (!passwCompare) {
    throw HttpError(401, 'E-mail or user invalid');
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findOneAndUpdate(user._id, { token });
  res.json({ token });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({ email });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndUpdate(_id, { token: '' });
  res.json({ message: 'Logout succes' });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
