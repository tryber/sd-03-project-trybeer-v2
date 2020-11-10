module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface
    .createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false,
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
    }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Products'),
};
