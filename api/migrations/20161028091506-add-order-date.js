'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('cart', 'order_date', {
      type: Sequelize.DATE
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('cart', 'order_date');
  }
};
