module.exports = (sequelize, DataTypes) => {
    
    const ApiKey = sequelize.define('ApiKey', {
        keyString: {
            type: DataTypes.STRING
          },
          portalId: {
            type: DataTypes.INTEGER
          },
          status: {
            type: DataTypes.BOOLEAN
          },
        },
        {
          tableName: 'ApiKey',
          freezeTableName: true
        }
      );
    
      return ApiKey;
  };
  