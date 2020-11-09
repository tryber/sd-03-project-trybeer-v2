module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    'salesProducts',
    {
      sale_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.sales, { as: 'sale', foreignKey: 'id', through: SalesProducts });
    SalesProducts.hasMany(models.products, { as: 'products', foreignKey: 'id' });
  };

  return SalesProducts;
};
