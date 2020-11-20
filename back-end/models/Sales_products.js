module.exports = (sequelize, DataTypes) => {
  const SalesProductsObject = sequelize.define(
    'sales_products',
    {
      sale_id: { type: DataTypes.INTEGER },
      product_id: { type: DataTypes.INTEGER },
      quantity: { type: DataTypes.STRING },
    },
    {
      timestamps: false,
    },
  );
  SalesProductsObject.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: SalesProductsObject,
      foreignKey: 'product_id',
      otherKey: 'id',
    });
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: SalesProductsObject,
      foreignKey: 'sale_id',
      otherKey: 'id',
    });
  };
  return SalesProductsObject;
};
