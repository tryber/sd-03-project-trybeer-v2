module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    { timestamps: false },
  );

  User.associate = (models) => {
    User.hasMany(models.sales,
      { as: 'user', foreignKey: 'id' });
  };

  return User;
};
