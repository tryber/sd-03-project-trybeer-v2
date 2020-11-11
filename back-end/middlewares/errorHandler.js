const errorHandler = (error, _req, res, _next) => {
  if (error.info && error.info.code === 1062) {
    return res.status(409).json({ message: error.message });
  }
  if (error.code) {
    return res.status(error.code).json({ message: error.message });
  }
  console.log({ message: error.message, stack: error.stack });
  return res.status(500).json({ message: error.message, stack: error.stack });
};

module.exports = { errorHandler };
