module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define('Subscription', {
        type: {
            type: DataTypes.TEXT
          },
          title: {
            type: DataTypes.TEXT
          },
          description: {
            type: DataTypes.TEXT
          },
          features: {
            type: DataTypes.JSON
          },
          pricing: {
            type: DataTypes.REAL
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
          tableName: 'Subscription',
          freezeTableName: true
        }
      );
    
      return Subscription;
    };
  