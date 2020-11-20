const { users } = require('../models');

const setNewName = async (body) => {
  const { name, email } = body;
  return users.update({ name }, { where: { email } });
};

module.exports = {
  setNewName,
};
