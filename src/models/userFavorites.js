module.exports = (sequelize, DataTypes) => {
    const UserFavorite = sequelize.define('UserFavorite', {
        
        portalId: {
            type: DataTypes.STRING
          },
          userId: {
            type: DataTypes.INTEGER
          },
          apparelItemId: {
            type: DataTypes.INTEGER
          },
          sessionId: {
            type: DataTypes.TEXT
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
          tableName: 'UserFavorite',
          freezeTableName: true
        }
      );
    
      return UserFavorite;
    };
  