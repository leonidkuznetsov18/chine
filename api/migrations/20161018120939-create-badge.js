'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('badge', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      slug: {
        type: Sequelize.STRING(50)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('badge');
  }
};
