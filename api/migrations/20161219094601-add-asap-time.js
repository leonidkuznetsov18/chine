'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'config',
      'asap_time',
      {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 45
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('config', 'asap_time')
  }
};
