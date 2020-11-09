module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    'salesProducts',
    {
      sale_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    { timestamps: true },
  );

  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.sales, {
      as: 'sales',
      foreignKey: 'sale_id',
      otherKey: 'sale_id',
      through: SalesProducts,
    });
    SalesProducts.hasMany(models.products, {
      as: 'products',
      foreignKey: 'products_id',
      otherKey: 'sale_id',
      through: SalesProducts,
    });
  };

  return SalesProducts;
};
