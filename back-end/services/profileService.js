const { users } = require('../models');

const updateUser = async (name, email) => {
  const [user] = await users.findAll({}, { where: { email } });
  if (!user) {
    return { error: 'user_not_exist' };
  }
  const { id } = user;
  await users.update({ includes: { id } }, { name, email });
  const result = await users.findAll({ email });
  return result;
};

module.exports = updateUser;
