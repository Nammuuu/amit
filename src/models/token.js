module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING
    },
    expires: {
      type: DataTypes.DATE
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Token;
};
