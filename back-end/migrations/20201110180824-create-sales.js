module.exports = {
  up: async (queryInterface, Sequelize) => {
    const SalesTable = queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
      },
      total_price: { allowNull: false, type: Sequelize.DECIMAL(9, 2) },
      delivery_address: { allowNull: false, type: Sequelize.STRING },
      delivery_number: { allowNull: false, type: Sequelize.STRING },
      sale_date: { allowNull: false, type: Sequelize.DATE },
      status: { allowNull: false, type: Sequelize.STRING },
    });

    return SalesTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('sales'),
};
