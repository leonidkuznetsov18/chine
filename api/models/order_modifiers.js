'use strict';
module.exports = function(sequelize, DataTypes) {
  var OrderModifiers = sequelize.define('order_modifiers', {
    value: DataTypes.INTEGER,
    modifier_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        OrderModifiers.belongsTo(models.modifier, { foreignKey: 'modifier_id' });
        OrderModifiers.belongsTo(models.order, { foreignKey: 'order_id' });
      }
    }
  });
  return OrderModifiers;
};
