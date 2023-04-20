const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../utils');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const authSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: { type: String, match: emailRegexp, require: true, unique: true },
    password: {
      type: String,
      minlenght: 6,
      require: true,
    },
  },

  { versionKey: false, timestamps: true }
);

authSchema.post('save', handleMongooseError);

const registerShemaBody = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginShemaBody = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const shemasUser = { registerShemaBody, loginShemaBody };

const User = model('user', authSchema);

module.exports = { shemasUser, User };
