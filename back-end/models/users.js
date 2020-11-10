const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.sales,
      { foreignKey: 'id', as: 'sales' });
  };

  return User;
};

module.exports = createUser;
