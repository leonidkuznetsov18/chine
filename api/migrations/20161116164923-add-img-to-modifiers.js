'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('modifier', 'img', {
      type: Sequelize.STRING(64)
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('modifier', 'img')
  }
};
