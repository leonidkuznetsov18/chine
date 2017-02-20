'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('cart_order', {
      cart_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "cart",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      order_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "order",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('cart_order');
  }
};
