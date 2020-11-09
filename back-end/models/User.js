module.exports = (sequelize, DataTypes) => {
  const UserObject = sequelize.define(
    'User',
    {
      fullName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, validate: { len: [6, 6] } },
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
