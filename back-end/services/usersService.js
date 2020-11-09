const { usersModel } = require('../models');
const { generateJwt } = require('../middlewares/auth');

// Referência regex para validação de email:
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const regexName = /[a-zA-Z\s]{12,}/;
const regexEmail = /\S+@\w+\.\w{2,6}(\.\w{2})?/;
const regexPassword = /\d{6,}/;

const validateEntries = (name, email, password) => {
  if (!regexName.test(name) || !regexEmail.test(email) || !regexPassword.test(password)) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  return true;
};

/*
cadastra por padrão role client, se precisar um role administrator
é necessário passar "role":"administrato"
*/
const registerUser = async (name, email, password, role = 'client') => {
  const isEntriesValid = validateEntries(name, email, password);

  if (typeof isEntriesValid === 'object') return isEntriesValid;

  const id = await usersModel.registerUser(name, email, password, role);

  const { token } = generateJwt({ id, name, email, password, role });

  return { name, email, role, token };
};

// retorna o token do usuário logado
const userLogin = async (email, password) => {
  if (!email || !password) return { message: 'All fields must be filled' };

  const user = await usersModel.getUserByEmail(email);

  if (!user || user.password !== password) return { message: 'Incorrect username or password' };

  const { token } = generateJwt(user);

  const { role, name } = user;

  return { name, email, role, token };
};

const editUser = async (name, email) => {
  const user = await usersModel.getUserByEmail(email);

  if (user.email !== email) return { message: 'Invalid email', code: '409' };

  await usersModel.editUser(name, email);

  return { name, email };
};

module.exports = { registerUser, userLogin, editUser };
