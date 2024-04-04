module.exports = (sequelize, DataTypes) => {
    const WidgetConfiguration = sequelize.define('WidgetConfiguration', {
        settings: {
            type: DataTypes.JSON
          },
          status: {
            type: DataTypes.BOOLEAN
          },
        },
        {
          tableName: 'WidgetConfiguration',
          freezeTableName: true
        }
      );
    
      return WidgetConfiguration;
  };
  