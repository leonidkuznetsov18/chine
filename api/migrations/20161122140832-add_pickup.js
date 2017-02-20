'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'address',
      'pickup',
      {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('address', 'pickup')
  }
};
