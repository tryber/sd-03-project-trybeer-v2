const Product = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
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
  return product;
};

module.exports = Product;
