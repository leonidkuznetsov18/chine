'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('config', 'timezone', {
      type: Sequelize.INTEGER(2),
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('config', 'timezone')
  }
};
