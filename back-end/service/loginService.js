const { users } = require('../models');

const singinEmail = async (email, myPassword) => {
  const user = await users.findOne({ where: { email } });
  if (user === null) {
    return { error: true, status: 404, message: 'Invalid email!' };
  }
  if (user.password !== myPassword) {
    return { error: true, status: 401, message: 'Incorrect password!' };
  }
  const { dataValues: { password, published, updated, ...userWithoutPass } } = user;
  return userWithoutPass;
};

module.exports = {
  singinEmail,
};
