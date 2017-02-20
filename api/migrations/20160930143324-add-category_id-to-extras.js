'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'extras',
      'category_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: "category",
          key: "id"
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('extras', 'category_id')
  }
};
