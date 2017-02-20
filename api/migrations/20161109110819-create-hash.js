'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('password_recover', {
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
      date_expired: {
        type: Sequelize.DATE
      },
      is_used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('password_recover');
  }
};