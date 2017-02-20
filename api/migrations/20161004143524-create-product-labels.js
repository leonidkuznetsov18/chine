'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('product_label', {
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "product",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      label_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "label",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('product_label');
  }
};
