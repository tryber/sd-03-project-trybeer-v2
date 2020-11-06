const createToken = require('../token/createToken');
const userModel = require('../models/userModel');

const createUser = async (userInfo) => {
  const { name, email, password, role } = userInfo;

  const result = await userModel.getByEmail(email);
  if (result) {
    return { error: 'email_in_use' };
  }
  const whichRole = role ? 'admin' : 'client';
  const modelInfo = { name, email, password, role: whichRole };
  const createdUser = await userModel.registerUser(modelInfo);
  const token = createToken(name, email, role);
  return { user: createdUser, token };
};

module.exports = createUser;
