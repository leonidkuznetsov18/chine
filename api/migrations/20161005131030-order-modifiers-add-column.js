'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('order_modifiers', 'order_id', {
      type: Sequelize.INTEGER
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('order_modifiers', 'order_id');
  }
};
