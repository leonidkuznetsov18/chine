'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'product',
      'type',
      {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'product'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('product', 'type')
  }
};
