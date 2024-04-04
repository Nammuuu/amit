module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Owner', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.TEXT
      },
      name: {
        type: Sequelize.TEXT
      },
      contact: {
        type: Sequelize.TEXT
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
  down: (queryInterface) => queryInterface.dropTable('Owner')
};
