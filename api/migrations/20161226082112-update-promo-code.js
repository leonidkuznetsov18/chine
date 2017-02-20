'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `DELETE FROM promo_code`
    ).then(() => {
      return queryInterface.changeColumn(
        'promo_code',
        'bundle_main_id',
        {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: null
        }
      ).then(() => {
        return queryInterface.changeColumn(
          'promo_code',
          'discount_product_id',
          {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: null
          }
        )
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'promo_code',
      'bundle_main_id',
      {
        type: Sequelize.DataTypes.STRING,
        defaultValue: null
      }
    ).then(() => {
      queryInterface.changeColumn(
        'promo_code',
        'discount_product_id',
        {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: null
        }
      )
    })
  }
};
