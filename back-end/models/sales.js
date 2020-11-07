module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'sales',
    {
      user_id: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      sale_date: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    { timestamps: true },
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.users, { as: 'user', foreignKey: 'user_id', through: models.salesProducts });
    Sale.hasMany(models.salesProducts, { as: 'sales_products' });
  };

  return Sale;
};
