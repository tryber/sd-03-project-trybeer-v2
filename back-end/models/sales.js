module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define(
    'sales',
    {
      user_id: DataTypes.INTEGER,
      total_price: DataTypes.DECIMAL(9, 2),
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      sale_date: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    { timestamps: true, createdAt: 'sale_date', updatedAt: false },
  );

  sale.associate = (models) => {
    sale.belongsTo(models.users, { foreignKey: 'user_id', as: 'user' });
  };

  return sale;
};
