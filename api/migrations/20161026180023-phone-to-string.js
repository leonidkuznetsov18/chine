'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'user',
      'phone',
      {
        type: Sequelize.STRING(25)
      }
    )
  },

  down: function (queryInterface, Sequelize) {
  }
};
