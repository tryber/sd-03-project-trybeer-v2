const jwt = require('jsonwebtoken');

const secret = 'BoraArrumarEmprego';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    req.userEmail = decoded.userEmail;
    console.log(req.userEmail);
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
