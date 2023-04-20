const express = require('express');
const { validateBody } = require('../../utils/index');

const { shemasUser } = require('../../models/user');
const ctrl = require('../../controllers/auth-controller');

const routes = express.Router();

routes.post(
  '/register',
  validateBody(shemasUser.registerShemaBody),
  ctrl.register
);

module.exports = routes;
