const Product = (sequelize, DataTypes) => {
   const product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: false,
      default: '',
    },
  }, { timestamps: false });
  // product.belongsToMany('sale', { through: 'sale_products' });
  return product;
}

module.exports = Product;
