module.exports = (io) => (req, _res, next) => {
  req.io = io;
  return next();
};
