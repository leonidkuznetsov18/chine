'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    short_description: DataTypes.STRING,
    description: DataTypes.TEXT,
    img: DataTypes.STRING,
    sorting: DataTypes.INTEGER,
    cook_time: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    badge_id: DataTypes.INTEGER,
    station: DataTypes.ENUM('back', 'front'),
    type: {
      type: DataTypes.STRING,
      defaultValue: 'product'
    }
  }, {
    classMethods: {
      associate: function(models) {
        Product.belongsTo(models.category);
        Product.belongsTo(models.badge);
        Product.hasOne(models.order);
        Product.hasMany(models.product_modifiers);
        Product.belongsToMany(models.label, {through: 'product_label'});
      }
    }
  });
  return Product;
};
