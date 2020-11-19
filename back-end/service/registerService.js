const { users } = require('../models');

const singupUser = async (name, email, password, role) => {
  const findUser = await users.findOne({ where: { email } });

  if (findUser !== null) {
    return { error: true, status: 401, message: 'E-mail already in database.' };
  }
  return users.create({ name, email, password, role }).then((results) => results.dataValues);
};

module.exports = {
  singupUser,
};
