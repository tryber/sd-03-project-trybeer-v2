const jwt = require('jsonwebtoken');
const { validateLogin, login, collectInfo } = require('../services/login');
const { setNewName } = require('../services/profile');

const { users } = require('../models');

const tokenConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
};
  
const SECRET = 'BoraArrumarEmprego';

jest.mock('../models');

describe('testing login service', () => {
  it('testing login with wrong email format', async () => {
    const returnedResponse = await validateLogin('trybertrybe.com.br', '123456');
    expect(returnedResponse).toEqual({ code: 400, message: 'Email deve ter o formato tal' });
  });
  it('testing login with wrong password format', async () => {
    const returnedResponse = await validateLogin('tryber@trybe.com.br', '1234');
    expect(returnedResponse).toEqual({ code: 400, message: 'Senha no formato incorreto' });
  });
  it('testing login with user nor found', async () => {
    users.findAll.mockResolvedValue([]);
    const returnedResponse = await validateLogin('renandreolle@gmail.com', '123456');
    expect(returnedResponse).toEqual({ code: 404, message: 'usuário não encontrado' });
  });
  it('testing login with wrong password', async () => {
    users.findAll.mockResolvedValue([{ id: 1, email: 'tryber@trybe.com.br', password: '123456' }]);
    const returnedResponse = await validateLogin('tryber@trybe.com.br', '12345679');
    expect(returnedResponse).toEqual({ code: 401, message: 'senha incorreta' });
  });
  it('testing login with right password', async () => {
    users.findAll.mockResolvedValue([{ id: 1, email: 'tryber@trybe.com.br', password: '123456', name: 'Tryber Admin', role: 'administrator' }]);
    const returnedResponse = await validateLogin('tryber@trybe.com.br', '123456');
    expect(returnedResponse).toEqual({ id: 1, email: 'tryber@trybe.com.br', name: 'Tryber Admin', role: 'administrator' });
  });
  it('testing collectInfo function', async () => {
    users.findAll.mockResolvedValue([{ id: 1, delivery_address: 'rua x', delivery_number: '32' }]);
    const returnedResponse = await collectInfo('tryber@trybe.com.br');
    expect(returnedResponse).toEqual({ userId: 1, street: 'rua x', number: '32' });
  });
  it('testing collectInfo function when fails', async () => {
    users.findAll.mockResolvedValue([{ code: 400, message: 'not found' }]);
    const returnedResponse = await collectInfo('tryber@trybe.com.br');
    expect(returnedResponse).toEqual({ code: 400, message: 'not found' });
  });
  it('testing login function', async () => {
    users.findAll.mockResolvedValue([{ id: 1, email: 'tryber@trybe.com.br', password: '123456', role: 'administrator', name: 'Tryber Admin' }]);
    const token = jwt.sign({ id: 1, role: 'administrator', userEmail: 'tryber@trybe.com.br', name: 'Tryber Admin' }, SECRET, tokenConfig);
    const returnedResponse = await login({ email: 'tryber@trybe.com.br', password: '123456' });
    expect(returnedResponse).toEqual({ name: 'Tryber Admin', email: 'tryber@trybe.com.br', role: 'administrator', token });
  });
  it('testing login function when fails', async () => {
    users.findAll.mockResolvedValue([{ code: 404, message: 'usuário não encontrado' }]);
    const returnedResponse = await login({ email: 'trybe@trybe.com.br', password: '123456' });
    expect(returnedResponse).toEqual({ code: 404, message: 'usuário não encontrado' });
  });
});

describe('testing profile service', () => {
  test('testing setNewName function', async () => {
    users.update = jest.fn().mockResolvedValue([{ name: 'Tryber Admin', email: 'zebirita@gmail.com' }]);
    const returnedResponse = await setNewName({ name: 'Tryber Admin', email: 'zebirita@gmail.com' });
    expect(returnedResponse).toEqual([{ name: 'Tryber Admin', email: 'zebirita@gmail.com' }]);
    expect(users.update).toHaveBeenCalledTimes(1);
  });
});
