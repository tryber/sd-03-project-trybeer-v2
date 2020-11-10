module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_image: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
  }, { createdAt: 'published', updatedAt: 'updated' });

  Products.associate = (models) => {
    Products.hasMany(models.SalesProducts, { as: 'sales_products', foreignKey: 'product_id' });
  };

  return Products;
};
