const express = require('express');
const rescue = require('express-rescue');

const register = express.Router();

const registerRouter = (userController) => {
  register.post('/', rescue(userController));
  return register;
};

module.exports = registerRouter;
