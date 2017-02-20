'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'modifier',
      'type',
      {
        type: Sequelize.ENUM('single', 'boolean', 'spiciness')
      }
    )
  },

  down: function (queryInterface, Sequelize) {
  }
};
