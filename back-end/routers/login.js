const express = require('express');
const rescue = require('express-rescue');

const login = express.Router();
const loginTest = (userController) => {
  login.post('/', rescue(userController.loginController));
  return login;
};

module.exports = loginTest;
