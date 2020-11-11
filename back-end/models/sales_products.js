module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('sales_products', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false });
  salesProducts.associate = ({ sale, product }) => {
    // product.belongsToMany(sale, {
    //   through: salesProducts,
    //   as: 'sales',
    //   foreignKey: 'sale_id',
    //   otherKey: 'product_id',
    // });
    // sale.belongsToMany(product, {
    //   through: salesProducts,
    //   as: 'products',
    //   foreignKey: 'product_id',
    //   otherKey: 'sale_id',
    // });
    product.belongsToMany(sale, {
      through: salesProducts,
      as: 'sales',
      foreignKey: 'product_id',
    });

    sale.belongsToMany(product, {
      through: salesProducts,
      as: 'products',
      foreignKey: 'sale_id',
    });
  };

  return salesProducts;
};
