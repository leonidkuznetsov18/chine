'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('cart', 'amount', {
      type: Sequelize.FLOAT
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('cart', 'amount');
  }
};
