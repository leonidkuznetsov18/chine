'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('status', 'slug', {
      type: Sequelize.STRING(50),
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('status', 'slug')
  }
};
