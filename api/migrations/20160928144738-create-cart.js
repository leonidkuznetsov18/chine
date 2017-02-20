'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('cart', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('sold_out', 'active', 'inactive')
      },
      delivery_time: {
        type: Sequelize.DATE
      },
      chopsticks: {
        type: Sequelize.INTEGER(3),
        default: 0
      },
      utensils: {
        type: Sequelize.INTEGER(3),
        default: 0
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
      address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "address",
          key: "id"
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('cart');
  }
};
