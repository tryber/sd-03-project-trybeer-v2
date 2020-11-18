const { users } = require('../models');

const updateUser = async (name, email) => {
  const [user] = await users.findAll({ where: { email } });
  console.log(user);
  if (!user) {
    return { error: 'user_not_exist' };
  }

  await users.update({ where: { email } }, { name });
  const result = await users.findAll({ where: { email } });
  console.log('result:', result);
  return result;
};

module.exports = updateUser;
