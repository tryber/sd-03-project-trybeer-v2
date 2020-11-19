const { users } = require('../models');

const changeName = async (name, email) => {
  await users.update({ name }, { where: { email } });

  return users.findOne({ where: { email } }).then(({ dataValues }) => dataValues);
};

module.exports = {
  changeName,
};
