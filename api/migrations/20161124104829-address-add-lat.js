'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'address',
      'lat',
      {
        type: Sequelize.DataTypes.FLOAT(20,17),
        defaultValue: 0.0
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('address', 'lat')
  }
};
