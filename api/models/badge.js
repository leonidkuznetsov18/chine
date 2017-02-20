'use strict';
module.exports = function(sequelize, DataTypes) {
  var Badge = sequelize.define('badge', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Badge.hasOne(models.product);
      }
    }
  });
  return Badge;
};
