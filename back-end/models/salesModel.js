module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
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
    Sales.belongsTo(models.Users, { foreignKey: 'user_id', as: 'users' });
  };

  Sales.associate = (models) => {
    Sales.hasMany(models.SalesProducts, { as: 'sales_products', foreignKey: 'sale_id' });
  };

  return Sales;
};
