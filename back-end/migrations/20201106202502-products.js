module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: false,
    },
    url_image: {
      type: Sequelize.STRING,
      allowNull: false,
      default: '',
    },
  }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('products'),
};
