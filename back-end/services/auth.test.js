const jwt = require('jsonwebtoken');
const faker = require('faker');
const auth = require('./auth');
const usersServices = require('./users');

jest.mock('jsonwebtoken');
jest.mock('./users');

describe('authService', () => {
  beforeEach(() => {
    usersServices.getUserByEmail.mockReset();
    jwt.verify.mockReset();
  });

  test('should return user if all use it', async () => {
    const email = faker.internet.email();
    const user = { email };

    jwt.verify.mockReturnValue(user);
    usersServices.getUserByEmail.mockResolvedValue(user);

    const returned = await auth(null, true);

    expect(usersServices.getUserByEmail).toHaveBeenCalledWith(email);
    expect(returned).toBe(user);
  });

  test('should return error if not find the and its is necessary', async () => {
    const email = faker.internet.email();
    const user = { email };

    jwt.verify.mockReturnValue(user);
    usersServices.getUserByEmail.mockResolvedValue(null);

    const returned = await auth(null, true);

    expect(usersServices.getUserByEmail).toHaveBeenCalledWith(email);
    expect(returned).toEqual({ error: true, message: 'email ou senha inválido' });
  });

  test('should pass if not necessary', async () => {
    const email = faker.internet.email();
    const user = { email };

    jwt.verify.mockReturnValue(user);
    usersServices.getUserByEmail.mockResolvedValue(null);

    const returned = await auth(null, false);

    expect(usersServices.getUserByEmail).toHaveBeenCalledWith(email);
    expect(returned).toEqual(null);
  });

  test('should return an error if happes an error', async () => {
    jwt.verify.mockRestore();

    usersServices.getUserByEmail.mockResolvedValue(null);

    const returned = await auth(null, false);

    expect(usersServices.getUserByEmail).not.toHaveBeenCalled();
    expect(returned).toEqual({ error: true, message: 'autenticacao invalido' });
  });
});
