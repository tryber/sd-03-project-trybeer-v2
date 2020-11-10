module.exports = (sequelize, DataTypes) => {
  const UserObject = sequelize.define(
    'users',
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, validate: { len: [6, 12] } },
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  return UserObject;

  // UserObject.associate = (models) => {
  //   UserObject.hasOne(models.Post, {
  //     foreignKey: 'id',
  //     as: 'addressesuser',
  //   });
  // };
};
