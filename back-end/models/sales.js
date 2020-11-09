const createSales = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    // id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL(9, 2),
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    delivery_city: DataTypes.STRING,
    delivery_district: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  sales.associate = (models) => {
    sales.belongsTo(models.users,
      { foreignKey: 'user_id', as: 'user' });
  };
  return sales;
};

module.exports = createSales;
