const createToken = require('../token/createToken');
const { users } = require('../models');

const createUser = async (userInfo) => {
  const { name, email, password, role } = userInfo;

  const result = await users.findAll({ email });
  console.log(result);
  if (result) {
    return { error: 'email_in_use' };
  }
  const whichRole = role ? 'admin' : 'client';
  const modelInfo = { name, email, password, role: whichRole };
  const createdUser = await users.create({ modelInfo });
  console.log('createdUser:', createdUser);
  const token = createToken(name, email, role);
  return { user: createdUser, token };
};

module.exports = createUser;
