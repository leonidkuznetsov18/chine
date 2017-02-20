'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'address',
      'company',
      {
        type: Sequelize.STRING(255)
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'address',
      'company',
      {
        type: Sequelize.STRING
      }
    )
  }
};
