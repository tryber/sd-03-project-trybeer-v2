const createToken = require('../token/createToken');
const { getByEmail } = require('../models/userModel');

const loginService = async (mail, password) => {
  const user = await getByEmail(mail);

  if (!user) return { error: 'invalid_user' };
  const { name, email, role, id } = user;
  if (user && user.password === password) {
    return createToken(name, email, role, id);
  }
  return { error: 'invalid_user' };
};

module.exports = loginService;
