'use strict';
module.exports = function(sequelize, DataTypes) {
  var Label = sequelize.define('label', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Label.belongsToMany(models.product, {through: 'product_label'});
      }
    }
  });
  return Label;
};
