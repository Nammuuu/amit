module.exports = (sequelize, DataTypes) => {
    const HumanFigure = sequelize.define('HumanFigure', {
imageId: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.STRING
  },
  portalId: {
    type: DataTypes.INTEGER
  },
  imagePath: {
    type: DataTypes.INTEGER
  },
  bodyFeatures: {
    type: DataTypes.JSON
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
  tableName: 'HumanFigure',
  freezeTableName: true
}
);

return HumanFigure;
};