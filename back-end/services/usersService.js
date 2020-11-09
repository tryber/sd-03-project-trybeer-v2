const { usersModel } = require('../models');

const getUserByEmail = async (email) => {
  try {
    const user = await usersModel.findByEmail(email);

    return user ? { ...user } : null;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addUser = async (name, email, password, role) => {
  try {
    const user = await usersModel.createUser(name, email, password, role);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (name, email) => {
  try {
    const updatedUser = await usersModel.updateUser(name, email);
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserByEmail,
  addUser,
  updateUser,
};
