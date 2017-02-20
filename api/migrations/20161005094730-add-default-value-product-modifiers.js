'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'product_modifiers',
      'value',
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    )
  }
};
