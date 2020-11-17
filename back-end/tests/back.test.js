const jwt = require('jsonwebtoken');
const { validateLogin, login, collectInfo } = require('../services/login');

const { users } = require('../models');

const secret = 'trybeer-grupo9';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

jest.mock('../models');

describe('testing login service', () => {
  it('testing login with wrong email format', async () => {
    const returnedResponse = await validateLogin('fab.emilianogmail.com', '12344556');
    expect(returnedResponse).toEqual({ code: 400, message: 'Email deve ter o formato tal' });
  });
  it('testing login with wrong password format', async () => {
    const returnedResponse = await validateLogin('fab.emiliano@gmail.com', '12344');
    expect(returnedResponse).toEqual({ code: 400, message: 'Senha no formato incorreto' });
  });
  it('testing login with user nor found', async () => {
    users.findAll.mockResolvedValue([]);
    const returnedResponse = await validateLogin('fab.emiliano@gmail.com', '12344556');
    expect(returnedResponse).toEqual({ code: 404, message: 'usuário não encontrado' });
  });
  it('testing login with wrong password', async () => {
    users.findAll.mockResolvedValue([{ id: 1, email: 'fab.emiliano@gmail.com', password: '12345678' }]);
    const returnedResponse = await validateLogin('fab.emiliano@gmail.com', '12345679');
    expect(returnedResponse).toEqual({ code: 401, message: 'senha incorreta' });
  });
  it('testing login with right password', async () => {
    users.findAll.mockResolvedValue([{ id: 1, email: 'fab.emiliano@gmail.com', password: '12345678' }]);
    const returnedResponse = await validateLogin('fab.emiliano@gmail.com', '12345678');
    expect(returnedResponse).toEqual({ id: 1, email: 'fab.emiliano@gmail.com' });
  });
  it('testin login function', async () => {
    users.findAll.mockResolvedValue([{ id: 1, email: 'fab.emiliano@gmail.com', password: '12345678', role: 'client', name: 'Fabiano' }]);
    const token = jwt.sign({ id: 1, role: 'client', userEmail: 'fab.emiliano@gmail.com', name: 'Fabiano' }, secret, jwtConfig);
    const returnedResponse = await login({ email: 'fab.emiliano@gmail.com', password: '12345678' });
    expect(returnedResponse).toEqual({ name: 'Fabiano', email: 'fab.emiliano@gmail.com', role: 'client', token });
  });
  it('testin login function when fails', async () => {
    users.findAll.mockResolvedValue([{ code: 404, message: 'usuário não encontrado' }]);
    const returnedResponse = await login({ email: 'fab.emiliano@gmail.com', password: '12345678' });
    expect(returnedResponse).toEqual({ code: 404, message: 'usuário não encontrado' });
  });
  it('testin collectInfo function', async () => {
    users.findAll.mockResolvedValue([{ id: 1, delivery_address: 'rua x', delivery_number: '32', delivery_city: 'Floripa', delivery_district: 'centro' }]);
    const returnedResponse = await collectInfo('fab.emiliano@gmail.com');
    expect(returnedResponse).toEqual({ userId: 1, street: 'rua x', number: '32', city: 'Floripa', district: 'centro' });
  });
  it('testin collectInfo function when fails', async () => {
    users.findAll.mockResolvedValue([{ code: 400, message: 'not found' }]);
    const returnedResponse = await collectInfo('fab.emiliano@gmail.com');
    expect(returnedResponse).toEqual({ code: 400, message: 'not found' });
  });
});
