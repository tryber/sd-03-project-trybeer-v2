module.exports = (sequelize, DataTypes) => {
  const SaleObject = sequelize.define(
    'sales',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
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
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'PENDENTE',
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
