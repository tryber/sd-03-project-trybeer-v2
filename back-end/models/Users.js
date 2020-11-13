const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, { timestamps: false });

  Users.associate = (models) => {
    Users.hasMany(models.sales, { foreignKey: 'userId', as: 'sales' });
  };

  return Users;
};

module.exports = createUsers;
