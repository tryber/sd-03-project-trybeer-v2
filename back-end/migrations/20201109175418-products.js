module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
    }),

  down: async (queryInterface, _Sequelize) =>
    queryInterface.dropTable('products'),
};
