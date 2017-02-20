'use strict';
module.exports = function(sequelize, DataTypes) {
  var PasswordRecover = sequelize.define('password_recover', {
    user_id: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    date_expired: DataTypes.DATE,
    is_used: DataTypes.BOOLEAN
  }, {
    classMethods: {
       associate: function(models) {
        PasswordRecover.belongsTo(models.user, { foreignKey: 'user_id' });
      }
    }
  });
  return PasswordRecover;
};