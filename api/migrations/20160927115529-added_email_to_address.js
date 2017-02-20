'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'address',
      'email',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('address', 'email')
  }
};
