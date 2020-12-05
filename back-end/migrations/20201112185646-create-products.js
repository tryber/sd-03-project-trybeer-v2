module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productsTable = queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(9, 2),
      },
      url_image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return productsTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('products'),
};
