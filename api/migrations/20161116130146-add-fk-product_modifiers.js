'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'product_modifiers',
      'product_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: "product",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
  }
};
