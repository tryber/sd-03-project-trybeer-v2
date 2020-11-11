const createSales = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      field: 'sale_date',
    },
  }, { createdAt: 'sale_date', updatedAt: false, underscored: true });

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, { foreignKey: 'user_id', as: 'user' });
  };

  return Sales;
};

module.exports = createSales;
