'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('cart', 'card_id', {
      type: Sequelize.INTEGER,
      references: {
        model: "card",
        key: "id"
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('cart', 'card_id');
  }
};
