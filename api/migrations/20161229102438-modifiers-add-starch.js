'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'modifier',
      'type',
      {
        type: Sequelize.ENUM('single', 'boolean', 'spiciness', 'starch')
      }
    );
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'modifier',
      'type',
      {
        type: Sequelize.ENUM('single', 'boolean', 'speciness')
      }
    );
  }
};
