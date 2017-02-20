'use strict';
module.exports = function(sequelize, DataTypes) {
  var subscribe = sequelize.define('subscribe', {
    user_id: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    is_subscribe: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        subscribe.belongsTo(models.user, { foreignKey: 'user_id' });
      }
    }
  });
  return subscribe;
};