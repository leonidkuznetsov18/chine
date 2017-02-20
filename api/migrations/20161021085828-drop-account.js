'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('account');
  },

  down: function (queryInterface, Sequelize) {
  }
};
