'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'config',
      'carry_out_asap_time',
      {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 45
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('config', 'carry_out_asap_time')
  }
};
