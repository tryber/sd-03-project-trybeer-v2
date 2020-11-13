const jwt = require('jsonwebtoken');
const { users } = require('../models');

const secret = 'xablaublaxablau';

const authJWT = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const { email } = decoded.data;

    const findUser = await users.findOne({ where: { email } });

    if (!findUser) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    req.user = findUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  authJWT,
};
