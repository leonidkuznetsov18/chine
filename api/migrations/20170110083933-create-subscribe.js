'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('subscribe', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      hash: {
        type: Sequelize.STRING(64)
      },
      is_subscribe: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('subscribe');
  }
};