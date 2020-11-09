const product = (sequelize, DataTypes) => sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
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

module.exports = product;
