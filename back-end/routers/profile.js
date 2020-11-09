const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../middlewares/validateToken');

const profile = express.Router();

const profileRouter = (profileController) => {
  profile.put('/', validateToken, rescue(profileController));
  return profile;
};

module.exports = profileRouter;
