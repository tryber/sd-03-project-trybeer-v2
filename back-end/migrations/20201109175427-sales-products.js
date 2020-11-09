module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('sales_products', {
      sale_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        foreignKey: true,
        references: { model: 'sales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        foreignKey: true,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }),

  down: async (queryInterface, _Sequelize) =>
    queryInterface.dropTable('sales_products'),
};
