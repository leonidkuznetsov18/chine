'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('category', {
    name: DataTypes.STRING,
    is_primary: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasOne(models.product);
      }
    }
  });
  return Category;
};
