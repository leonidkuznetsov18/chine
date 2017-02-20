'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'account',
      'email',
      {
        type: Sequelize.STRING(64)
      }
    )
  },

  down: function (queryInterface, Sequelize) {
  }
};
