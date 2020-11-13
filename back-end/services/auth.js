const jwt = require('jsonwebtoken');
const usersServices = require('./users');

const { SECRET = 'preguicaDeCriarUmSegredo' } = process.env;

module.exports = async (token, isNecessary = true) => {
  try {
    const user = jwt.verify(token, SECRET);

    const DBUser = await usersServices.getUserByEmail(user.email);
    if (!DBUser && isNecessary) return { error: true, message: 'email ou senha inválido' };

    return DBUser;
  } catch (err) {
    return { error: true, message: 'autenticacao invalido' };
  }
};
