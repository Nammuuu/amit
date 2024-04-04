module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING(255)  // Specify the length for VARCHAR
      },
      firebaseId: {
        type: DataTypes.STRING(255)  // Specify the length for VARCHAR
      },
      contact: {
        type: DataTypes.STRING(655)  // Specify the length for VARCHAR
      },
      loginType: {
        type: DataTypes.STRING(255)  // Specify the length for VARCHAR
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'Users',
      
      freezeTableName: true,
      defaultScope: {
        // attributes: { exclude: ['password'] }
      },
      scopes: {
        withSecretColumns: {
          // attributes: { include: ['password'] }
        }
      }
    }
  );

  // User.associate = function (models) {

  //   User.hasOne(models.Cart, {
  //     foreignKey: 'userId'
  //   });  
  // };

  return User;
};
