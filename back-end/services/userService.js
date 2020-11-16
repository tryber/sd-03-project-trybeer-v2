const jwt = require('jsonwebtoken');
const { user } = require('../models');

const JWT_SECRET = 'tentecerveja';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const RegisterUser = async (userData) => {
  const { name, email, password, seller = false } = userData;
  const createdUser = await user.create({ name, email, password, role: seller ? 'administrator' : 'client' })
    .then(() => ({ status: 201 }))
    .catch(({ errors }) => ({ status: 409, message: errors[0].message }));
  if (createdUser.status === 201) {
    const token = jwt.sign({ name, email, seller }, JWT_SECRET || 'tentecerveja', jwtConfig);
    return { ...createdUser, token };
  }
  return createdUser;
};

const LoginUser = async (userEmail, userPass) => {
  const response = await user.findOne({ where: { email: userEmail } });
  if (!response || response.dataValues.email !== userEmail) return { status: 404, message: 'Não há cadastro com esse email.' };
  if (response.dataValues.password !== userPass) return { status: 400, message: 'Senha incorreta.' };
  const { password, ...userData } = response.dataValues;
  const token = jwt.sign(userData, JWT_SECRET || 'tentecerveja', jwtConfig);
  return { ...userData, token };
};

const UpdateUserName = async (userName, userEmail) => {
  if (userName.length <= 1 || userName.length > 24) return { status: 400, message: 'Nome inválido.' };
  await user.update({ name: userName }, { where: { email: userEmail } });
  const dbUser = await user.findOne({ where: { email: userEmail } });
  const { dataValues: { password, ...userData } } = dbUser;
  const token = jwt.sign(userData, JWT_SECRET || 'tentecerveja', jwtConfig);
  return { ...userData, token, message: 'Atualização concluída com sucesso' };
};

module.exports = {
  RegisterUser,
  LoginUser,
  UpdateUserName,
};

// const ValidadeUser = async (name, email, password, dbEmail) => {
//   const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
//   const validName = /^[a-z ,.'-]+$/i.test(name);
//   const validPass = /[\d]{6}$/.test(password);
//   switch (true) {
//     case (!validName || name.length < 12):
//       return { status: 422, message: 'Nome inválido!' };
//     case (!validEmail):
//       return { status: 422, message: 'Email inválido!' };
//     case (!validPass):
//       return { status: 422, message: 'Senha inválida!' };
//     case (dbEmail && dbEmail === email):
//       return { status: 422, message: 'E-mail already in database.' };
//     default:
//       return { status: 200, message: '' };
//   }
// };
