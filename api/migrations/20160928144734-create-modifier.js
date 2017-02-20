'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('modifier', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      type: {
        type: Sequelize.ENUM('single', 'boolean', 'speciness')
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('modifier');
  }
};
