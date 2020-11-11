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
    { timestamps: false },
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.users, {
      as: 'sale',
      foreignKey: 'user_id',
    });
  // Sale.hasMany(models.salesProducts, { as: 'sales_products', foreignKey: 'sale_id' });
  };

  return Sale;
};
