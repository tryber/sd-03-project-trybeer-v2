module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert(
    'users',
    [
      {
        id: 1,
        name: 'Tryber Admin',
        email: 'tryber@trybe.com.br',
        password: '123456',
        role: 'administrator',
      },
      {
        id: 2,
        name: 'testuser',
        email: 'user@test.com',
        password: 'test123',
        role: 'client',
      },
    ],
    {},
  ),

  down: async (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
