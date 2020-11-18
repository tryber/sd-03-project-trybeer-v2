module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      url_image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return Product;
};
