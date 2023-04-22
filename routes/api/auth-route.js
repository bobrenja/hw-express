const express = require('express');
const { validateBody } = require('../../utils/index');

const { authIsValidToken } = require('../../middlewares');

const { shemasUser } = require('../../models/user');
const ctrl = require('../../controllers/auth-controller');

const routes = express.Router();

routes.post(
  '/register',
  validateBody(shemasUser.registerShemaBody),
  ctrl.register
);

routes.post('/login', validateBody(shemasUser.loginShemaBody), ctrl.login);

routes.get('/current', authIsValidToken, ctrl.getCurrent);
routes.post('/logout', authIsValidToken, ctrl.logout)

module.exports = routes;
