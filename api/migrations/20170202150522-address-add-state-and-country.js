'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'address',
      'state',
      {
        type: Sequelize.DataTypes.STRING,
      }
    ).then(() => {
      return queryInterface.addColumn(
        'address',
        'country',
        {
          type: Sequelize.DataTypes.STRING,
        }
      );
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('address', 'state').then(() => {
      return queryInterface.removeColumn('address', 'country');
    });
  }
};
