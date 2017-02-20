'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('product', 'order', 'sorting')
  },

  down: function (queryInterface, Sequelize) {
  }
};
