const profileService = require('../services/profileService');

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  const response = await profileService(name, email);

  if (response.error) return next(response.error);

  return res.status(200).json(response);
};

module.exports = { updateUser };
