'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'product_modifiers',
      'img',
      {
        type: Sequelize.DataTypes.STRING
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('product_modifiers', 'img')
  }
};