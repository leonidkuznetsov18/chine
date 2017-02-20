'use strict';
import {io} from '../api';
import moment from 'moment';

module.exports = function(sequelize, DataTypes) {
  var Cart = sequelize.define('cart', {
    delivery_time: DataTypes.DATE,
    chopsticks: DataTypes.INTEGER(3),
    utensils: DataTypes.INTEGER(3),
    plates: DataTypes.INTEGER(3),
    user_id: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    card_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    amount: DataTypes.FLOAT,
    promo_code_id: DataTypes.INTEGER,
    transaction_id: DataTypes.INTEGER,
    pickup: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bringg_uiid: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    bringg_driver_id: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    temp_group_id: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    asap: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    paid_cart: {
      type: DataTypes.TEXT,
      defaultValue: null,
      get: function() {
        return JSON.parse(this.getDataValue('paid_cart'))
      },
      set: function(value){
        if (value) {
          return this.setDataValue(
            'paid_cart',
            JSON.stringify({...value.toJSON(), order_date: moment.utc(value.order_date)})
          );
        }
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        Cart.belongsTo(models.user);
        Cart.belongsTo(models.address);
        Cart.belongsTo(models.status);
        Cart.belongsTo(models.promo_code);
        Cart.belongsToMany(models.order, {through: 'cart_order', hooks: true});
      }
    }
  });
  Cart.afterUpdate(function(cart){
    if (cart._previousDataValues.status_id !== cart.dataValues.status_id){
      if (cart._previousDataValues.status_id === null){
        // handle new order
        cart.reload().then(function(cart){
          io.to('admin').emit('newOrder', cart);
          // store cart in cart history.
          cart.update({
            paid_cart: cart
          })
        });
      } else {
        cart.reload().then(function(cart){
          io.to(cart.dataValues.id).emit('updateOrderStatus', cart.toJSON());
          io.to('admin').emit('updateOrderStatus', cart.toJSON())
        });
      }
    }
  });
  return Cart;
};
