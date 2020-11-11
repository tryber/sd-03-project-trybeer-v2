const jwt = require('jsonwebtoken');
const { users } = require('../models');

const secret = 'donthack';

const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const nameTest = /^[A-Za-z]+$/i;

const validateLogin = (email, password) => {
  if (password.length < 6 || !email.match(emailTest)) {
    return { status: 400, message: 'Invalid entries.' };
  }
  return null;
};

const valideteNewUser = (name, email, password) => {
  if ((name.length < 12 || !name.match(nameTest))
    && (typeof password !== 'number' || password.length < 6)
    && (!email.match(emailTest))) {
    return { status: 403, message: 'Name, email or password invalid' };
  }
  return null;
};

const login = async (userEmail, userPassword) => {
  const isValid = validateLogin(userEmail, userPassword);

  if (isValid) return isValid;

  const user = await users.findOne({ where: { email: userEmail } });
  if (!user || userPassword !== user.password) {
    return { status: 401, message: 'Incorrect user email or password.' };
  }

  const jwtLogin = { expiresIn: '30m', algorithm: 'HS256' };
  const { name, email, role } = user;
  const token = jwt.sign({ data: email }, secret, jwtLogin);

  return { token, name, email, role };
};

const newUser = async (name, email, Password, role) => {
  const validate = valideteNewUser(name, email, Password);
  if (validate) return validate;
  const existingEmail = await users.findOne({ where: { email } });

  if (existingEmail) {
    return { status: 403, message: 'E-mail already in database.' };
  }

  await users.create({ name, email, password: Password, role });

  const data = await login(email, Password);

  return data;
};

const update = async (name, paramsEmail, email) => {
  if (paramsEmail !== email) {
    return { status: 403, message: 'Wrong user token.' };
  }

  await users.update({ name }, { where: { email } });

  const data = await users.findOne({ where: { email } });

  const { dataValues } = data;

  const { password, ...user } = dataValues;

  return user;
};

module.exports = {
  login,
  newUser,
  valideteNewUser,
  update,
};
