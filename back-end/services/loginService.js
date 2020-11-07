const createToken = require('../token/createToken');
const { users } = require('../models');

const loginService = async (email, password) => {
  const user = await users.findAll({ email });

  if (!user) return { error: 'invalid_user' };
  const { name, email: mail, role, id } = user;
  if (user && user.password === password) {
    return createToken(name, mail, role, id);
  }
  return { error: 'invalid_user' };
};

module.exports = loginService;
