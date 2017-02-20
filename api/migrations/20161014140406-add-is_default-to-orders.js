'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('order', 
      'is_default', {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('order', 'is_default')
  }
};
