const createSales = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    delivery_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sale_date: {
      type: DataTypes.DATE,
      field: 'sale_date',
    },
  }, { createdAt: 'sale_date', updatedAt: false });

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, { foreignKey: 'user_id', as: 'user' });
    // Sales.hasMany(models.sales_products, { as: 'salesProducts', foreignKey: 'sale_id' });
  };

  return Sales;
};

module.exports = createSales;
