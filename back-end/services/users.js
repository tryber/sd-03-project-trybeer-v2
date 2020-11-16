const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Models = require('../models');
const Mongo = require('../mongoModels');

const { SECRET = 'preguicaDeCriarUmSegredo' } = process.env;

const options = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const emailSchema = Joi.string().email()
  .required();

const passwordSchema = Joi.string().min(6)
  .required();

const nameSchema = Joi.string().regex(/^[a-zA-Z ]{12}[a-zA-Z ]*$/)
  .min(12)
  .required()
  .error(() => new Error(
    'pelo menos 12 caracteres, não pode conter numeros nem caracteres especiais',
  ));

const roleSchema = Joi.boolean().custom((value) => (value ? 'administrator' : 'client'));

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const generateToken = (userObj) => {
  try {
    if (userObj.password) return 'Não foi possível gerar a autenticacao';
    const { password, ...user } = userObj;
    const token = jwt.sign(user, SECRET, options);
    return { token };
  } catch (err) {
    return { error: 'Não foi possível gerar a autenticacao' };
  }
};

const userSchema = Joi.object({
  email: emailSchema.error(
    () => new Error('email tem que ser no formato <nome@dominio>'),
  ),
  password: passwordSchema.error(
    () => new Error('senha de pelo menos 6 digitos'),
  ),
  name: nameSchema,
  role: roleSchema,
});

const getUserByEmail = async (email) => Models.users.findOne({ where: { email } })
  .then((user) => user && user.dataValues);

const createUser = async ({ id, email, name, password, role }) => Models.users
  .create({ id, email, name, role, password })
  .then((insertion) => insertion.dataValues);

const changeUserName = async (name, { id }) => {
  const { dataValues: { password, ...user } } = await Models.users.findByPk(id);

  const [updated] = await Models.users.update({ name }, { where: { id } });
  if (!updated) return { error: true, message: 'not updated' };

  return { ...user, name };
};

const saveUserSocket = async (socketId, room, user) => Mongo.Users.setUser(socketId, room, user);

const deleteUserSocket = async (socketId) => Mongo.Users.removeUserBySocketId(socketId);

const findUserSocket = async (query) => Mongo.Users.findUser(query);

module.exports = {
  nameSchema,
  loginSchema,
  userSchema,
  getUserByEmail,
  createUser,
  changeUserName,
  generateToken,
  saveUserSocket,
  deleteUserSocket,
  findUserSocket,
};
