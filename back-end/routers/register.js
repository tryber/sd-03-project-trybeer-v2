const express = require('express');
const rescue = require('express-rescue');

const register = express.Router();

const registerRouter = (createUser) => {
  register.post('/', rescue(createUser));
  return register;
};

module.exports = registerRouter;
