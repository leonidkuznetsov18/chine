'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'cart',
      'bringg_driver_id',
      {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: null
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('cart', 'bringg_driver_id')
  }
};
