module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('payment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // subscriptionId: {
      //   type: Sequelize.INTEGER
      // },
      subscriptionId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'Subscription',
          key: 'id'
        }
      },
      
      type: {
        type: Sequelize.STRING
      },
      paymentIdentidier: {
        type: Sequelize.INTEGER
      },
      transactionsDate: {
        type: Sequelize.INTEGER
      },
      details: {
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
  down: (queryInterface) => queryInterface.dropTable('payment')
};
