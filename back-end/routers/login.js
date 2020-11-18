const express = require('express');
const rescue = require('express-rescue');

const login = express.Router();
const loginTest = (loginController) => {
  login.post('/', rescue(loginController));
  return login;
};

module.exports = loginTest;
