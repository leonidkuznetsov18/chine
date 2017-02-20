'use strict';

module.exports = function(sequelize, DataTypes){
  var PromoCode = sequelize.define('promo_code', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    type: DataTypes.ENUM('order', 'single_product', 'bundle'),
    max_number_of_usages: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    expire_date: DataTypes.DATE,
    min_order_sum: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    value: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    bundle_main_id: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    discount_product_id: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    max_discount_products: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        PromoCode.hasOne(models.cart);
      }
    }
  });
  return PromoCode;
};