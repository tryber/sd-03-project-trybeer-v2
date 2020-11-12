module.exports = (sequelize, DataTypes) => {
  const ProductsObject = sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      price: {
        type: DataTypes.DECIMAL(4, 2),
      },
      url_image: { type: DataTypes.STRING },
    },
    {
      timestamps: false,
    },
  );
  return ProductsObject;

  // UserObject.associate = (models) => {
  //   UserObject.hasOne(models.Post, {
  //     foreignKey: 'id',
  //     as: 'addressesuser',
  //   });
  // };
};
