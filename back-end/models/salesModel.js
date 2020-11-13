module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { sale_date: 'published', updatedAt: 'updated' });

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, { as: 'users', foreignKey: 'user_id' });
  };

  Sales.associate = (models) => {
    Sales.hasMany(models.SalesProducts, { foreignKey: 'sale_id', as: 'sales_products' });
  };

  return Sales;
};
