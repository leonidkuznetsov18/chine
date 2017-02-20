'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('product', 'status_id');
  },

  down: function (queryInterface, Sequelize) {
  }
};
