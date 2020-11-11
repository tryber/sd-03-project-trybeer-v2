const jwt = require('jsonwebtoken');
const { jwtConfig, secret } = require('./jwtConfiguration');
const { user } = require('../models');

const generateJwt = (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return { token };
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const { data: { email } } = jwt.verify(token, secret);

    const userData = await user.findAll({ where: { email }, raw: true });

    if (!userData[0]) {
      return res.status(401).json({ message: 'invalid token' });
    }

    const { password, ...userDataValues } = userData[0];

    req.user = userDataValues;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  generateJwt,
  validateJWT,
};
