'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('order', 'order_modifiers_id');
  },

  down: function (queryInterface, Sequelize) {
  }
};
