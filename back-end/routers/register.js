const express = require('express');
const rescue = require('express-rescue');

const register = express.Router();

const registerRouter = (userController) => {
  register.post('/', rescue(userController.createUser));
  return register;
};

module.exports = registerRouter;
