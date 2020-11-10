const createSale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sales', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    total_price: DataTypes.DECIMAL(9, 2),
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: true,
    createdAt: 'sale_date',
    updatedAt: false,
    deletedAt: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.users,
      { foreignKey: 'user_id', as: 'user' });
  };

  return Sale;
};

module.exports = createSale;
