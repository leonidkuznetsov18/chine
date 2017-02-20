'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'promo_code',
      'name',
      {
        type: Sequelize.DataTypes.STRING,
        unique: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.ChangeColumn(
      'promo_code',
      'name',
      {
        type: Sequelize.DataTypes.STRING
      }
    )
  }
};
