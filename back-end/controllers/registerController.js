const registerService = require('../services/registerService');

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const response = await registerService({ name, email, password, role });

  if (response.error) return next(response.error);
  return res.status(200).json(response);
};

module.exports = { createUser };
