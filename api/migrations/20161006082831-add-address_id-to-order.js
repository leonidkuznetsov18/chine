'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('order', 'address_id', {
      type: Sequelize.INTEGER,
      references: {
        model: "address",
        key: "id"
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('order', 'address_id')
  }
};
