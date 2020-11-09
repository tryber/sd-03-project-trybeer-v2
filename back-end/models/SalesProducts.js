const createSalesProducts = (sequelize, _DataTypes) => {
  const productsSales = sequelize.define('sales_products', {}, { timestamps: false });

  productsSales.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: productsSales,
      foreignKey: 'sales_id',
      otherKey: 'product_id',
    });
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: productsSales,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return productsSales;
};

module.exports = createSalesProducts;
