'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'address',
      'distance',
      {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: null
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('address', 'distance')
  }
};
