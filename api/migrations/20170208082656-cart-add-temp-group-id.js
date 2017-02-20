'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'cart',
      'temp_group_id',
      {
        type: Sequelize.DataTypes.STRING,
        defaultValue: null
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('cart', 'temp_group_id')
  }
};
