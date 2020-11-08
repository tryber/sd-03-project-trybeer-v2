const jwt = require('jsonwebtoken');
const { users } = require('../models');

const secret = 'trybeer-grupo9';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const validateLogin = async (email, pass) => {
  const regex = /^\S+@\S+$/;
  if (!email.match(regex)) return { code: 400, message: 'Email deve ter o formato tal' };
  if (pass.length < 6) return { code: 400, message: 'Senha no formato incorreto' };
  const userInfo = (await users.findAll({ where: { email } }))[0];
  if (!userInfo.id) return { code: 404, message: 'usuário não encontrado' };
  if (userInfo.password !== pass) return { code: 401, message: 'senha incorreta' };
  const { password, ...info } = userInfo;
  return info;
};

const login = async ({ email, password }) => {
  const { code, message, id, name, email: userEmail, role } = await validateLogin(email, password);
  if (message) return { code, message };
  const token = jwt.sign({ id, role, userEmail, name }, secret, jwtConfig);
  return { name, email, token, role };
};

// const collectInfo = async (email) => {
//   const { code, message, street, number, city, district } = await model.login.getUserInfo(email);
//   if (message) return { code, message };
//   return { street, number, city, district };
// };

module.exports = {
  login,
  validateLogin,
  // collectInfo,
};
