'use strict';
module.exports = function(sequelize, DataTypes) {
  var Modifier = sequelize.define('modifier', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    img: DataTypes.STRING,
    type: DataTypes.ENUM('single', 'boolean', 'speciness', 'starch'),
    station: DataTypes.ENUM('back', 'front'),
  }, {
    classMethods: {
      associate: function(models) {
        Modifier.hasMany(models.order_modifiers);
        Modifier.hasMany(models.product_modifiers);
      }
    }
  });
  return Modifier;
};
