'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('user', 'role', {
      type: Sequelize.ENUM('user', 'admin', 'customer'),
      defaultValue: 'customer'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('user', 'role')
  }
};
