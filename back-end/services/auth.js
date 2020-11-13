const jwt = require('jsonwebtoken');
const { users } = require('../models');

const secret = 'donthack';

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Missing auth token.' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const { data } = decoded;

    const user = await users.findOne({ where: { email: data } });

    if (!user) {
      return res.status(401).json({ message: 'User does not exists.' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'JWT malformed.' });
  }
};

module.exports = auth;
