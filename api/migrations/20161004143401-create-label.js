'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('label', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(150)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('label');
  }
};
