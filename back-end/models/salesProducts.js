const createSalesProducts = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });
  salesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: salesProducts,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: salesProducts,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };
  return salesProducts;
};

module.exports = createSalesProducts;
