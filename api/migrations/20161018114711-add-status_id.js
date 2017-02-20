'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('cart', 'status_id', {
      type: Sequelize.INTEGER,
      references: {
        model: "status",
        key: "id"
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('cart', 'status_id')
  }
};
