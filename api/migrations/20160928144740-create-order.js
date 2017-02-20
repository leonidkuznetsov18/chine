'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      count: {
        type: Sequelize.INTEGER(3)
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "product",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      order_extras_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "order_extras",
          key: "id"
        }
      },
      order_modifiers_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "order_modifiers",
          key: "id"
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('order');
  }
};
