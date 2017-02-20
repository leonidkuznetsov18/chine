'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('cart', 'status');
  },

  down: function (queryInterface, Sequelize) {
  }
};
