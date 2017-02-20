'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductModifiers = sequelize.define('product_modifiers', {
    value: DataTypes.INTEGER,
    modifier_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    img: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        ProductModifiers.belongsTo(models.modifier);
        ProductModifiers.belongsTo(models.product);
      }
    }
  });
  return ProductModifiers;
};
