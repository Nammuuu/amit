module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('human-figure', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageId: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      // userId: {
      //   type: Sequelize.STRING
      // },
      // portalId: {
      //   type: Sequelize.INTEGER
      // },
      portalId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'ecommerce_portal',
          key: 'id'
        }
      },
      imagePath: {
        type: Sequelize.INTEGER
      },
      bodyFeatures: {
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
  down: (queryInterface) => queryInterface.dropTable('human-figure')
};
