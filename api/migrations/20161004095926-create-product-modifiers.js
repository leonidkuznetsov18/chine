'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('product_modifiers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.INTEGER(3)
      },
      modifier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "modifier",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "product",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('product_modifiers');
  }
};
