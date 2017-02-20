'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'cart',
      'promo_code_id',
      {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: null
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('cart', 'promo_code_id')
  }
};
