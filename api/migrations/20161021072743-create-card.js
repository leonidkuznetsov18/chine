'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('card', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      card_no: {
        type: Sequelize.STRING(64)
      },
      exp_date: {
        type: Sequelize.STRING(64)
      },
      cvc: {
        type: Sequelize.STRING(64)
      },
      is_default: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('cards');
  }
};
