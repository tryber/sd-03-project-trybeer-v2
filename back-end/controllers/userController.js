const updateUser = (service) => async (req, res, next) => {
  const { name, email } = req.body;
  const response = await service.updateUser(name, email);

  if (response.error) return next(response.error);

  return res.status(200).json(response);
};

const loginController = (service) => async (req, res, next) => {
  const { email, password } = req.body;

  const response = await service.loginService(email, password);

  if (response.error) return next(response.error);

  return res.status(200).json(response);
};

const createUser = (service) => async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const response = await service.createUser({ name, email, password, role });

  if (response.error) return next(response.error);
  return res.status(200).json(response);
};

module.exports = (userService) => ({
  updateUser: updateUser(userService),
  loginController: loginController(userService),
  createUser: createUser(userService),
});
