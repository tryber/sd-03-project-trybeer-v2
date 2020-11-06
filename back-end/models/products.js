const createProducts = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(9, 2),
    urlImage: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  products.associate = (models) => {
    products.hasMany(models.salesProducts,
      { foreignKey: 'id', as: 'product' });
  };
  return products;
};

module.exports = createProducts;
