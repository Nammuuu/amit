module.exports = (sequelize, DataTypes) => {
    
  const Admin = sequelize.define('Admins', {
        name: {
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING
        },
      },
      {
        tableName: 'Admins',
        freezeTableName: true
      }
    );
  
    return Admin;
};