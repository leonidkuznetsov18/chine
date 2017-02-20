'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('user', 'phone', {
      type: Sequelize.INTEGER(50)
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('user', 'phone');
  }
};
