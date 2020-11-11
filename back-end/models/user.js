const user = (sequelize, DataTypes) => sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    validate: {
      isEmail: {
        msg: 'O formato deste "email" é inválido',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        min: 6,
        msg: '"password" precisa ter mais do que 6 caracteres',
      },
      notNull: {
        msg: '"password" não pode ser nulo',
      },
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { timestamps: false });

module.exports = user;
