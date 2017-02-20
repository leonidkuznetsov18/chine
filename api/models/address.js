'use strict';
module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define('address', {
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    building: DataTypes.STRING,
    zip_code: DataTypes.INTEGER,
    company: DataTypes.STRING,
    apt_floor: DataTypes.STRING,
    notes: DataTypes.STRING,
    email: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    is_default: DataTypes.BOOLEAN,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    out_of_range: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lat: DataTypes.FLOAT(20, 17),
    lng: DataTypes.FLOAT(20, 17),
    distance: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  }, {
    classMethods: {
      associate: function(models) {
        Address.belongsTo(models.user);
        Address.hasOne(models.order);
      }
    }
  });
  return Address;
};
