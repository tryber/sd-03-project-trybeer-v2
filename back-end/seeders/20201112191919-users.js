module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'tryber@trybe.com.br',
        password: '12345678',
        role: 'administrator',
      },
      {
        name: 'User',
        email: 'user@test.com',
        password: 'test123',
        role: 'client',
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
