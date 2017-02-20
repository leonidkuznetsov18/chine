'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('product', 'short_description', {
      type: Sequelize.STRING(255)
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('product', 'short_description')
  }
};
