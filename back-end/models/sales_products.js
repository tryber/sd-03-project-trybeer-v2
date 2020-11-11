module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    'salesProducts',
    {
      quantity: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  SalesProducts.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      through: SalesProducts,
    });
    models.sales.belongsToMany(models.products, {
      as: 'products',
      foreignKey: 'sale_id',
      otherKey: 'product_id',

      through: SalesProducts,
    });
  };

  return SalesProducts;
};
