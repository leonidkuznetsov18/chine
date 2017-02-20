'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('order_extras', 'extra_id', {type: Sequelize.INTEGER(1)})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('order_extras,', 'extra_id')
  }
};
