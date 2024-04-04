module.exports = (sequelize, DataTypes) => {
    const Owner = sequelize.define('Owner', {
        email: {
            type: DataTypes.STRING
          },
          password: {
            type: DataTypes.STRING(255)
          },
          name: {
            type: DataTypes.STRING(255)
          },
          contact: {
            type: DataTypes.STRING(655)
          },
          loginType: {
            type: DataTypes.STRING(255)
          },
          status: {
            type: DataTypes.BOOLEAN
          },
        },
        {
          tableName: 'Owner',
          freezeTableName: true
        }
    
    );
    return Owner;
  };
  