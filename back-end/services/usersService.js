const { users } = require('../models');
const { generateJWT } = require('../middlewares');

const userLogin = async (email, pass) => {
  const user = await users.findOne({ where: { email }, raw: true });

  if (!user || user.password !== pass) {
    return {
      err: { code: 'invalid_entries', message: 'Wrong email or password' },
    };
  }

  const { password, ...userData } = user;

  const { token } = generateJWT(userData);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
    role: user.role,
  };
};

const registerUser = async (name, email, password, role = 'client') => {
  try {
    await users.create({ name, email, password, role });

    return userLogin(email, password);
  } catch (err) {
    console.error(err);
    // const { info } = err;

    // if (info.code === 1062) {
    //   return {
    //     err: { code: 'invalid_entries', message: 'E-mail already in database.' },
    //   };
    // }

    // return {
    //   err: { code: info.code, message: info.msg },
    // };
  }
};

const updateClientName = async (name, email) => {
  try {
    await users.update({ name, email }, { where: { email } });

    const user = await users.findOne({ where: { email } });

    const { password, ...userData } = user;

    const { token } = generateJWT(userData);

    return {
      name: user.name,
      email: user.email,
      token,
      role: user.role,
    };
  } catch (err) {
    const { info } = err;

    return {
      err: { code: info.code, message: info.msg },
    };
  }
};

module.exports = {
  updateClientName,
  userLogin,
  registerUser,
};
