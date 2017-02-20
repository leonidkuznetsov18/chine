'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'cart',
      'paid_cart',
      {
        type: Sequelize.DataTypes.TEXT,
        defaultValue: null
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('cart', 'paid_cart')
  }
};
