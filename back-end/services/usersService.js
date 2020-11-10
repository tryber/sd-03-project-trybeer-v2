const { user } = require('../models');
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

  const { dataValues: { id } } = await user.create({ name, email, password, role });

  const { token } = generateJwt({ id, name, email, password, role });

  return { name, email, role, token };
};

// retorna o token do usuário logado
const userLogin = async (email, password) => {
  if (!email || !password) return { message: 'All fields must be filled' };

  const userData = await user.findAll({ where: { email }, raw: true });

  const { email: userEmail, password: userPassword } = userData[0];

  if (
    !userEmail || userPassword !== password
  ) return { message: 'Incorrect username or password' };

  const { token } = generateJwt(userData[0]);

  const { role, name } = userData[0];

  return { name, email, role, token };
};

const editUser = async (name, email) => {
  const userData = await user.findAll({ where: { email }, raw: true });

  if (userData[0].email !== email) return { message: 'Invalid email', code: '409' };

  await user.update({ name, email }, { where: { email } });

  const updatedUser = await user.findAll({ where: { email }, raw: true });

  const { email: userEmail, name: userName } = updatedUser[0];

  return { name: userName, email: userEmail };
};

module.exports = { registerUser, userLogin, editUser };
