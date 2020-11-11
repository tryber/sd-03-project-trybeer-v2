const createProducts = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    url_image: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });

  return products;
};

module.exports = createProducts;
