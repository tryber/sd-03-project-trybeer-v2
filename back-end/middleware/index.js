const authMiddleware = require('./auth');
const errorMiddleware = require('./error');
const ioMiddleware = require('./io');

module.exports = {
  authMiddleware,
  errorMiddleware,
  ioMiddleware,
};
