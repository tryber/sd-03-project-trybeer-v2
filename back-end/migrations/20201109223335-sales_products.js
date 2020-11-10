module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('sales_products', {
    sales_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'sales',
        key: 'id',
      },
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('sales_products'),
};
