module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      url_image: DataTypes.STRING,
    },
    { timestamps: true },
  );

  Product.associate = (models) => {
    Product.belongsToMany(models.sales, { as: 'product',
      foreignKey: 'product_id',
      through: models.salesProducts });
  };

  return Product;
};
