const userModel = require('../models/userModel');

const updateUser = async (name, email) => {
  const userExists = await userModel.getByEmail(email);
  if (!userExists) {
    return { error: 'user_not_exist' };
  }
  await userModel.updateUser(name, email);
  const result = await userModel.getByEmail(email);
  return result;
};

module.exports = updateUser;
