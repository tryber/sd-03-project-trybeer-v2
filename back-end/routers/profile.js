const express = require('express');
const rescue = require('express-rescue');

const { updateUser } = require('../controllers/profileController');
const validateToken = require('../middlewares/validateToken');

const profile = express.Router();

profile.put('/', validateToken, rescue(updateUser));

module.exports = profile;
