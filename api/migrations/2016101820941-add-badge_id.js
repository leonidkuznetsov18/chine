'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('product', 'badge_id', {
      type: Sequelize.INTEGER,
      references: {
        model: "badge",
        key: "id"
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    });
  },

  down: function (queryInterface, Sequelize) {
  }
};
