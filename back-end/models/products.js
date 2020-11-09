module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(4, 2),
      url_image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  product.associate = (models) => {
    product.belongsToMany(models.sales, {
      through: 'sales_products',
      as: 'sales',
      foreignKey: 'product_id',
    });
  };

  return product;
};
