module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('api-keys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      keyString: {
        type: Sequelize.STRING
      },
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
  down: (queryInterface) => queryInterface.dropTable('api-keys')
};
