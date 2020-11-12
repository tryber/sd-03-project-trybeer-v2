const { users } = require('../models');

const getUserByEmail = async (email) => {
  try {
    const user = await users.findAll({ where: { email } });
    return user ? { ...user } : null;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addUser = async (name, email, password, role) => {
  try {
    // const user = await User.create(name, email, password, role);
    // return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (name, email) => {
  try {
    const user = await users.update({ name }, { where: { email } });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserByEmail,
  addUser,
  updateUser,
};
