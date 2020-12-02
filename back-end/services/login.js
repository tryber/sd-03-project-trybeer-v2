const jwt = require('jsonwebtoken');
const { users } = require('../models');

const tokenConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const SECRET = 'BoraArrumarEmprego';

const validateLogin = async (email, pass) => {
  const regex = /^\S+@\S+$/;
  if (!email.match(regex)) return { code: 400, message: 'Email deve ter o formato tal' };
  if (pass.length < 6) return { code: 400, message: 'Senha no formato incorreto' };
  const userInfo = (await users.findAll({ where: { email } }))[0];
  if (!userInfo) return { code: 404, message: 'usuário não encontrado' };
  if (userInfo.password !== pass) return { code: 401, message: 'senha incorreta' };
  const { password, ...info } = userInfo.dataValues;
  return info;
};

const login = async ({ email, password }) => {
  const { code, message, id, name, email: userEmail, role } = await validateLogin(email, password);
  if (message) return { code, message };
  const token = jwt.sign({ id, role, userEmail, name }, SECRET, tokenConfig);
  return { name, email, token, role };
};

const collectInfo = async (email) => {
  const { code, message, id: userId, delivery_address: street,
    delivery_number: number } = (await users.findAll({ where: { email } }))[0];
  if (message) return { code, message };
  return { userId, street, number };
};

module.exports = {
  login,
  validateLogin,
  collectInfo,
};
