'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING(50)
      },
      last_name: {
        type: Sequelize.STRING(50)
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('user');
  }
};
