const jwt = require('jsonwebtoken');

const { tokenConfig, SECRET } = require('./config');
const { usersService } = require('../services');
const { generateError } = require('../utils');

const errorCode = 401;

module.exports = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await usersService.getUserByEmail(body.email);

    if (!user) throw new Error('invalid user or password');
    if (body.password !== user.password) throw new Error('invalid user or password');

    const { password, ...userData } = user;

    const token = jwt.sign({ data: userData }, SECRET, tokenConfig);

    return res.status(200).json({ token });
  } catch (error) {
    next(generateError(errorCode, error));
  }
};
