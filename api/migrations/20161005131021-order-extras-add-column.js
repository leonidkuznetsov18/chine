'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('order_extras', 'order_id', {
      type: Sequelize.INTEGER,
      references: {
        model: "order",
        key: "id"
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('order_extras', 'order_id');
  }
};
