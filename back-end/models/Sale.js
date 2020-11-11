const createdSale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sale', {
    user_id: { type: DataTypes.INTEGER, foreignKeyKey: true },
    total_price: DataTypes.DECIMAL(9, 2),
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  }, { timestamps: false });

  Sale.associate = (models) => {
    Sale.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
  };

  return Sale;
};

module.exports = createdSale;
