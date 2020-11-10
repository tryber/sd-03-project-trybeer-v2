const createProducts = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
  }, { timestamps: false });

  // Products.associate = (models) => {
  //   Products.hasMany(models.sales_products, { as: 'salesProducts', foreignKey: 'product_id' });
  // };

  return Products;
};

module.exports = createProducts;
