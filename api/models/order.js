'use strict';
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('order', {
    count: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    is_default: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Order.belongsTo(models.product);
        Order.hasMany(models.order_modifiers);
        Order.belongsToMany(models.cart, {through: 'cart_order', hooks: true});
      }
    }
  });
  return Order;
};
