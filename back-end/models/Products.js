const createProducts = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
  }, { timestamps: false, underscored: true });

  return Products;
};

module.exports = createProducts;
