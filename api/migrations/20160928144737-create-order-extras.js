'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('order_extras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      count: {
        type: Sequelize.INTEGER(3),
        default: 1
      },
      extras_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "extras",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('order_extras');
  }
};
