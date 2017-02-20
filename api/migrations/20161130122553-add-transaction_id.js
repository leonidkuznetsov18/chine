'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('cart', 'transaction_id', {
      type: Sequelize.STRING(64),
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('cart', 'transaction_id');
  }
};
