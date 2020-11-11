const createUsers = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    delivery_district: DataTypes.INTEGER,
    delivery_city: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  users.associate = (models) => {
    users.hasMany(models.sales,
      { foreignKey: 'id', as: 'sales' });
  };
  return users;
};

module.exports = createUsers;
