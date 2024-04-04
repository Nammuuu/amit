module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ecommerce_portal', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      subscriptionId: {
        type: Sequelize.STRING
      },
      // paymentId: {
      //   type: Sequelize.STRING
      // },
      paymentId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'payment',
          key: 'id'
        }
      },
      apiKey: {
        type: Sequelize.STRING
      },
      // widgetId: {
      //   type: Sequelize.STRING
      // },
      widgetId:{
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'widget_configuration',
          key: 'id'
        }
      },
      url: {
        type: Sequelize.TEXT
      },
      frontedTech: {
        type: Sequelize.TEXT
      },
      perferences: {
        type: Sequelize.JSON
      },
      loginType: {
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
  down: (queryInterface) => queryInterface.dropTable('ecommerce_portal')
};
