'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'modifier',
      'station',
      {
        type: Sequelize.DataTypes.ENUM('back', 'front')
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('modifier', 'station')
  }
};
