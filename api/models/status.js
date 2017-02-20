'use strict';
module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define('status', {
    slug: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Status.hasOne(models.cart);
      }
    }
  });
  return Status;
};
