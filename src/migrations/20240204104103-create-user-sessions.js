module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('user-sessions', {
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
      // userId: {
      //   type: Sequelize.VARCHAR
      // },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      apparelId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'apparel_items',
          key: 'id'
        }
      },
      feedback: {
        type: Sequelize.TEXT
      },
      duration: {
        type: Sequelize.TEXT
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
  down: (queryInterface) => queryInterface.dropTable('user-sessions')
};
