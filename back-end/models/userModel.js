module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { createdAt: 'published', updatedAt: 'updated' });

  Users.associate = (models) => {
    Users.hasMany(models.sales, { as: 'sales', foreignKey: 'user_id' });
  };

  return Users;
};
