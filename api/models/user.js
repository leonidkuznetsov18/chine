'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    is_catering: DataTypes.BOOLEAN,
    role: DataTypes.ENUM('user','admin','customer')
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.address);
        User.hasMany(models.card);
        User.hasOne(models.cart);
        User.hasMany(models.password_recover);
        User.hasOne(models.subscribe);
      }
    }
  });
  return User;
};
