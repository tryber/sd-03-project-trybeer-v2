const express = require('express');
const rescue = require('express-rescue');

const loginController = require('../controllers/loginController');

const login = express.Router();

login.post('/', rescue(loginController));

module.exports = login;
