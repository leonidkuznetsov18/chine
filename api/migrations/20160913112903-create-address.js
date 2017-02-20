'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING(50)
      },
      street: {
        type: Sequelize.STRING(50)
      },
      building: {
        type: Sequelize.STRING(50)
      },
      zip_code: {
        type: Sequelize.INTEGER(10)
      },
      company: {
        type: Sequelize.STRING(50)
      },
      apt_floor: {
        type: Sequelize.STRING(50)
      },
      notes: {
        type: Sequelize.STRING(255)
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id"
        }
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('address');
  }
};
