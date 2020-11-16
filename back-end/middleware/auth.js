const Boom = require('boom');
const rescue = require('express-rescue');

const { authServices } = require('../services');

module.exports = (isNecessary = true) => rescue(async (req, _res, next) => {
  const { authorization: token } = req.headers;

  const user = await authServices(token, isNecessary);

  if (user.error) return next(Boom.unauthorized(user.message));

  req.user = user;
  return next();
});
