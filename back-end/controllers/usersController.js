const { Router } = require('express');

const { usersService } = require('../services');
const middlewares = require('../middlewares');

const { schemas, validateSchema } = middlewares.validation;
const user = Router();

user.route('/register').post(
  validateSchema(schemas.userSchema),
  async (req, _res, next) => {
    try {
      const { name, email, password, role } = req.body;
      const userData = await usersService.addUser(name, email, password, role);

      if (!userData) throw new Error();

      return next();
    } catch (error) {
      return next(error);
    }
  },
  middlewares.login,
);

user.route('/profile').put(validateSchema(schemas.userUpdateSchema), async (req, _res, next) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await usersService.updateUser(name, email);
    if (!updatedUser) throw new Error();

    const userData = await usersService.getUserByEmail(email);

    req.body = userData;

    return next();
  } catch (error) {
    return next(error);
  }
}, middlewares.login);

user
  .route('/login')
  .post(validateSchema(schemas.loginSchema), middlewares.login);

module.exports = user;
