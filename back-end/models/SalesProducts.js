const createSalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('sales_products', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false });

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
    // SalesProducts.belongsTo(models.sales, { as: 'sales_products', foreignKey: 'sale_id' });
    // SalesProducts.belongsTo(models.products, { as: 'salesProducts', foreignKey: 'product_id' });
  };
  return SalesProducts;
};

module.exports = createSalesProducts;
