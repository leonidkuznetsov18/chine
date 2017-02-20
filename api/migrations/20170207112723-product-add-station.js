'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'product',
      'station',
      {
        type: Sequelize.DataTypes.ENUM('back', 'front')
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('product', 'station')
  }
};
