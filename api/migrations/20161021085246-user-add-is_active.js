'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('user', 'is_active', {
      type: Sequelize.BOOLEAN
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('user', 'is_active');
  }
};
