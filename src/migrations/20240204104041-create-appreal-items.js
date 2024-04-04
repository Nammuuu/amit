module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('apparel_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // portalId: {
      //   type: Sequelize.VARCHAR
      // },
      portalId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'ecommerce_portal',
          key: 'id'
        }
      },
      imageUrl: {
        type: Sequelize.TEXT
      },
      apparelType: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.JSON
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface) => queryInterface.dropTable('apparel_items')
};
