'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      price: {
        type: Sequelize.FLOAT(3)
      },
      description: {
        type: Sequelize.TEXT
      },
      img: {
        type: Sequelize.STRING(64)
      },
      order: {
        type: Sequelize.INTEGER(4)
      },
      cook_time: {
        type: Sequelize.INTEGER(3)
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "category",
          key: "id"
        }
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "status",
          key: "id"
        }
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('product');
  }
};
