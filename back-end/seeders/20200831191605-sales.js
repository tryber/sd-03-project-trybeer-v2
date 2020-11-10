module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales', [
      {
        user_id: 2,
        total_price: 19.5,
        delivery_address: 'Rua Trybe',
        delivery_number: '2020',
        sale_date: '2020-11-10 04:00:02',
        status: 'pendente',
      },
      {
        user_id: 2,
        total_price: 25.5,
        delivery_address: 'Rua Famosa',
        delivery_number: '2021',
        sale_date: '2020-11-10 04:00:05',
        status: 'pendente',
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
