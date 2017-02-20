'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'cart',
      'asap',
      {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('cart', 'asap')
  }
};
