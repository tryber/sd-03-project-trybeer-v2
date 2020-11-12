module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    'sales_products',
    {
      quantity: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  saleProduct.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      through: saleProduct,
      as: 'products',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.products.belongsToMany(models.sales, {
      through: saleProduct,
      as: 'sales',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return saleProduct;
};
