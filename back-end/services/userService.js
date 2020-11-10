const createToken = require('../token/createToken');

const createUser = (users) => async (userInfo) => {
  const { name, email, password, role } = userInfo;

  const [user] = await users.findAll({ where: { email } });

  if (user) {
    return { error: 'email_in_use' };
  }
  const whichRole = role ? 'admin' : 'client';
  const modelInfo = { name, email, password, role: whichRole };
  const createdUser = await users.create(modelInfo);

  const token = createToken(name, email, role);
  return { user: createdUser, token };
};

const updateUser = (users) => async (name, email) => {
  const user = await users.findAll({ where: { email } });
  if (!user) {
    return { error: 'user_not_exist' };
  }

  await users.update({ where: { email } }, { name });
  const result = await users.findAll({ where: { email } });
  console.log('result:', result);
  return result;
};

const loginService = (users) => async (email, password) => {
  const [user] = await users.findAll({ where: { email } });

  if (!user) return { error: 'invalid_user' };

  const { name, email: mail, role, id } = user;

  if (user && user.dataValues.password === password) {
    return createToken(name, mail, role, id);
  }

  return { error: 'invalid_user' };
};

module.exports = (users) => ({
  updateUser: updateUser(users),
  loginService: loginService(users),
  createUser: createUser(users),
});
