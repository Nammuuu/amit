module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Subscription', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      features: {
        type: Sequelize.JSON
      },
      pricing: {
        type: Sequelize.REAL
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
  down: (queryInterface) => queryInterface.dropTable('Subscription')
};
