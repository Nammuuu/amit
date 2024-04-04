module.exports = (sequelize, DataTypes) => {
    const Portal = sequelize.define('Portal', {
        ownerId: {
            type: DataTypes.INTEGER
          },
          subscriptionId: {
            type: DataTypes.STRING
          },
          paymentId: {
            type: DataTypes.STRING
          },
          apiKey: {
            type: DataTypes.STRING
          },
          widgetId: {
            type: DataTypes.STRING
          },
          url: {
            type: DataTypes.STRING(255)
          },
          frontedTech: {
            type: DataTypes.STRING(255)
          },
          preferences: {
            type: DataTypes.JSON
          },
          loginType: {
            type: DataTypes.STRING(255)
          },
          status: {
            type: DataTypes.BOOLEAN
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
          }
        },
        {
          tableName: 'Portal',
          freezeTableName: true
        }
      );

      Portal.associate = function (models) {

          Portal.hasOne(models.Payment, {
      foreignKey: 'paymentId'
    });  
  };
    
      return Portal;
  };
  