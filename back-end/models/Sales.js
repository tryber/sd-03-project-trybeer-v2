module.exports = (sequelize, DataTypes) => {
  const SaleObject = sequelize.define(
    'sales',
    {
      user_id: {
        type: DataTypes.INTEGER,
      },
      total_price: {
        type: DataTypes.DECIMAL(9, 2),
      },
      delivery_address: {
        type: DataTypes.STRING,
      },
      delivery_number: {
        type: DataTypes.STRING,
      },
      sale_date: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    },
  );
  return SaleObject;

  // UserObject.associate = (models) => {
  //   UserObject.hasOne(models.Post, {
  //     foreignKey: 'id',
  //     as: 'addressesuser',
  //   });
  // };
};
