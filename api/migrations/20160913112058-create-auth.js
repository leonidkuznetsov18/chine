'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('account', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING(64)
      },
      phone: {
        type: Sequelize.STRING(50)
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
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('account');
  }
};
