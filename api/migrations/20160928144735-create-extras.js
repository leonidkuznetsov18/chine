'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('extras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT(3)
      },
      img: {
        type: Sequelize.STRING(64)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('extras');
  }
};
