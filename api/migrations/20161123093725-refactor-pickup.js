'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('address', 'pickup', 'out_of_range').then(() => {
      return queryInterface.addColumn(
        'cart',
        'pickup',
        {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false
        }
      )
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('address', 'out_of_range', 'pickup').then(() => {
      return queryInterface.removeColumn('cart', 'pickup')
    })
  }
};
