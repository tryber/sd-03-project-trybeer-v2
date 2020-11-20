module.exports = {
  up: async (queryInterface, Sequelize) => {
    const SalesProductsTable = queryInterface.createTable('sales_products', {
      sale_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'sales',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.DECIMAL(4, 2),
      },
    });

    return SalesProductsTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('sales_products'),
};
