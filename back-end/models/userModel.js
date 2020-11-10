module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, { createdAt: 'published', updatedAt: 'updated' });

  Users.associate = (models) => {
    Users.hasMany(models.Sales, { as: 'Sales', foreignKey: 'user_id' });
  };

  return Users;
};
