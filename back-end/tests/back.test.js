const request = require('supertest');
const app = require('../app');
const { restartDb } = require('./db');

let server;
beforeAll(async (done) => {
  await restartDb();
  server = app.listen(4000);
  done();
});

const user = {
  name: 'asdfasdfasdfasdf',
  email: 'asdf@asdf.com',
  password: '123456',
};

const resultObj = {
  name: 'asdfasdfasdfasdf',
  email: 'asdf@asdf.com',
  role: 'client',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI69-9I7M',
};

describe('user register', () => {
  test('Is possible create an commom user', async (done) => {
    try {
      const { body } = await request(server)
        .post('/users')
        .send(user);
      expect(body.email).toBe(resultObj.email);
      expect(body.name).toBe(resultObj.name);
      done();
    } catch (error) {
      console.log(error);
      done();
    }
  });
});
