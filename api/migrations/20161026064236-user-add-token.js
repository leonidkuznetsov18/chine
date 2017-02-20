'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('user', 'token', {
      type: Sequelize.STRING(64)
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('user', 'token')
  }
};
