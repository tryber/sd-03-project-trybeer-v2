module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'users',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    { timestamps: false },
  );

  user.associate = (models) => {
    user.hasMany(models.sales, { foreignKey: 'user_id', as: 'sale' });
  };

  return user;
};
