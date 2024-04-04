module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('widget_configuration', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      settings: {
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
  down: (queryInterface) => queryInterface.dropTable('widget_configuration')
};
