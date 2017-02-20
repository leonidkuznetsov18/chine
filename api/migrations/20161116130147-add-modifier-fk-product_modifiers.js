'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'product_modifiers',
      'modifier_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: "modifier",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    )
  },

  down: function (queryInterface, Sequelize) { }
};
