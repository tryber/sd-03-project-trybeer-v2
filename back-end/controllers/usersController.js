const rescue = require('express-rescue');
const { usersService } = require('../services');

const newUser = rescue(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const registeredUser = await usersService.registerUser(name, email, password, role);

  if (registeredUser.message) {
    return next(registeredUser);
  }

  return res.status(201).json(registeredUser);
});

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.userLogin(email, password);
  if (user.message) {
    return res.status(401).json(user);
  }
  return res.status(200).json(user);
});

const editUser = rescue(async (req, res, next) => {
  const { name, email } = req.body;

  const editedUser = await usersService.editUser(name, email);

  if (editedUser.message) {
    return next(editedUser);
  }

  res.status(200).json(editedUser);
});

module.exports = { newUser, userLogin, editUser };
