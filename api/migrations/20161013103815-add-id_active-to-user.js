'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('account', 
      'is_active', {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('account', 'is_active')
  }
};
