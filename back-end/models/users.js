module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    { timestamps: true },
  );

  User.associate = (models) => {
    User.hasMany(models.sales, { as: 'sales' });
  };

  return User;
};
