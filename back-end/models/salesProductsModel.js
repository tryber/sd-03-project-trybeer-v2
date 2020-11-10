module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sale_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { createdAt: 'published', updatedAt: 'updated' });

  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.Sales, { foreignKey: 'sale_id', as: 'sales_products' });
  };

  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.Products, { foreignKey: 'product_id', as: 'sales_products' });
  };

  return SalesProducts;
};
