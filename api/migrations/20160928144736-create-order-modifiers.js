'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('order_modifiers', {
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
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('order_modifiers');
  }
};
