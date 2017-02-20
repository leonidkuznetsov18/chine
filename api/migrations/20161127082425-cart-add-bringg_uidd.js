'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'cart',
      'bringg_uiid',
      {
        type: Sequelize.DataTypes.STRING,
        defaultValue: null
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('cart', 'bringg_uiid')
  }
};
