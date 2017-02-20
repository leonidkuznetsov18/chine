'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('cart', 'plates', {
      type: Sequelize.INTEGER(3)
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('cart', 'plates')
  }
};
