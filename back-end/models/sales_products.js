module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('sales_products', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false });
  salesProducts.associate = ({ sale, product }) => {
    product.belongsToMany(sale, {
      through: 'sales_product',
      as: 'sales',
      foreignKey: 'sale_id',
      otherKey: 'id',
    });
    sale.belongsToMany(product, {
      through: 'sales_product',
      as: 'products',
      foreignKey: 'product_id',
      otherKey: 'id',
    });
  };

  return salesProducts;
};
