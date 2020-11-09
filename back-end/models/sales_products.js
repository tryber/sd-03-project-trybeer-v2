module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    'sales_products',
    {
      sale_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  return saleProduct;
};
