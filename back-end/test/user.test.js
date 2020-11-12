const chai = require('chai');
const chaiHttp = require('chai-http');
const { user } = require('../models');

chai.use(chaiHttp);

const URL = 'http://localhost:3001';

const users = [
  {
    name: 'Usuario de test',
    email: 'email@email.com',
    password: '12345678',
  },
  {
    name: 'Usuario de test 2',
    email: 'email-email.com',
    password: '12345678',
  },
  {
    name: 'Usuario de test 3',
    email: 'email@email.com',
    password: '128',
  },
];

describe('Usuário - Endpoints', () => {
  beforeEach(async (done) => {
    await user.destroy({ where: {} });
    done();
  });

  afterEach(async (done) => {
    await user.destroy({ where: {} });
    done();
  });

  test('Verifica se é possível criar um usuário com sucesso', async () => {
    const response = await chai.request(URL)
      .post('/register')
      .send(users[0]);
    expect(typeof response.body.token).toBe('string');
    expect(response.body.status).toBe(201);
  });
  test('Verifica se não é possível criar um usuário com email inválido', async (done) => {
    chai.request(URL)
      .post('/register')
      .send(users[1])
      .end((_err, res) => {
        expect(res.body.status).toBe(409);
        expect(res.body.message).toBe('O formato deste "email" é inválido');
        done();
      });
  });
  test('Verifica se não é possível criar um usuário com senha inválida', async (done) => {
    chai.request(URL)
      .post('/register')
      .send(users[2])
      .end((_err, res) => {
        expect(res.body.status).toBe(409);
        expect(res.body.message).toBe('"password" precisa ter mais do que 6 caracteres');
        done();
      });
  });
  test('Verifica se é possivel fazer login', async (done) => {
    const response = await chai.request(URL)
      .post('/register')
      .send(users[0]);
    expect(response.body.status).toBe(201);
    const login = await chai.request(URL)
      .post('/login')
      .send(users[0]);
    expect(login.body.email).toBe(users[0].email);
    expect(login.body.name).toBe(users[0].name);
    expect(login.body.id).not.toBeUndefined();
    expect(login.body.token).not.toBeUndefined();
    expect(typeof login.body.token).toBe('string');
    done();
  });
  test('Verifica se não é possivel atualizar o nome de usuário sem estar logado', async (done) => {
    const response = await chai.request(URL)
      .post('/register')
      .send(users[0]);
    expect(response.body.status).toBe(201);
    const login = await chai.request(URL)
      .post('/login')
      .send(users[0]);
    expect(login.body.token).not.toBeUndefined();
    expect(typeof login.body.token).toBe('string');

    const update = await chai.request(URL)
      .post('/profile')
      .send({ name: 'Nome de usuario 1', email: 'email@emailatualizado.com' });
    expect(update.body.message).toBe('Usuário não logado');
    done();
  });

  test('Verifica se é possivel atualizar o nome de usuário', async (done) => {
    const response = await chai.request(URL)
      .post('/register')
      .send(users[0]);
    expect(response.body.status).toBe(201);

    const login = await chai.request(URL)
      .post('/login')
      .send(users[0]);
    expect(login.body.token).not.toBeUndefined();
    expect(typeof login.body.token).toBe('string');

    const update = await chai.request(URL)
      .post('/profile')
      .set('authorization', login.body.token)
      .send({ name: 'Meu novo nome 1', email: 'email@email.com' });
    expect(update.body.message).toBe('Atualização concluída com sucesso');
    done();
  });
});
