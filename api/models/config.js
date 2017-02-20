'use strict';
module.exports = function(sequelize, DataTypes) {
  var Config = sequelize.define('config', {
    splash_screen: DataTypes.STRING,
    timezone: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER,
    asap_time: {
      type: DataTypes.INTEGER,
      defaultValue: 45
    },
    carry_out_asap_time: {
      type: DataTypes.INTEGER,
      defaultValue: 45
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Config;
};
