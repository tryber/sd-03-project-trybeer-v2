const Sale = (sequelize, DataTypes) => {
  const sale = sequelize.define('sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(9, 2),
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
    sale_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  sale.associate = (models) => {
    sale.belongsTo(models.user, { as: 'user', foreignKey: 'user_id' });
  };
  return sale;
};

module.exports = Sale;
