const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { HttpError } = require('../helpers/');

const { SECRET_KEY } = process.env;

const authIsValidToken = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401));
    return;
  }

  try {
    const { id } = jwt.decode(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(HttpError(401));
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authIsValidToken;
