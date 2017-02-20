'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('promo_code', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING(255),
        defaultValue: null
      },
      type: {
        type: Sequelize.DataTypes.ENUM('order', 'single_product', 'bundle')
      },
      max_number_of_usages: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: null
      },
      expire_date: {
        type: Sequelize.DataTypes.DATE
      },
      min_order_sum: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: null
      },
      value: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: null
      },
      bundle_main_id: {
        type: Sequelize.DataTypes.STRING(255),
        defaultValue: null
      },
      discount_product_id: {
        type: Sequelize.DataTypes.STRING(255),
        defaultValue: null
      },
      max_discount_products: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: null
      },
      status: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('promo_code')
  }
};
