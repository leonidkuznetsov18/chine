'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('order_extras').then(() => {
      return queryInterface.dropTable('extras');
    });
  },

  down: function (queryInterface, Sequelize) {
    
  }
};
