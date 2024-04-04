module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('user-favorite', {
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
      //   type: Sequelize.INTEGER
      // },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      // apparelItemId: {
      //   type: Sequelize.INTEGER
      // },
      apparelItemId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'apparel_items',
          key: 'id'
        }
      },
      // sessionId: {
      //   type: Sequelize.TEXT
      // },
      sessionId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'user-sessions',
          key: 'id'
        }
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
  down: (queryInterface) => queryInterface.dropTable('user-favorite')
};
