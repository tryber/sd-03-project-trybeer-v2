module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(9, 2),
      },
      delivery_address: {
        type: Sequelize.STRING,
      },
      delivery_number: {
        type: Sequelize.INTEGER,
      },
      sale_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
    });

    return UsersTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('sales'),
};
