'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('card', {
    card_no: DataTypes.STRING,
    exp_date: DataTypes.STRING,
    cvc: DataTypes.STRING,
    is_default: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.user);
      }
    }
  });
  return Card;
};
