module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admininstrador tryber',
        email: 'tryber@trybe.com.br',
        password: '12345678',
        role: 'administrator',
        delivery_address: 'rua x',
        delivery_number: '72',
        delivery_city: 'Florianópolis',
        delivery_district: 'pantanal',
      },
      {
        name: 'Cliente Zé Birita',
        email: 'zebirita@gmail.com',
        password: '12345678',
        role: 'client',
        delivery_address: 'rua x',
        delivery_number: '72',
        delivery_city: 'Florianópolis',
        delivery_district: 'pantanal',
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
