'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    let data = [];
    return queryInterface.removeColumn('order', 'address_id').then(() => {
      return queryInterface.addColumn(
        'order',
        'address_id', {
          type: Sequelize.INTEGER,
        }
      ).then(() => {
        return queryInterface.sequelize.query(
          'SELECT id, address_id from cart WHERE address_id IS NOT NULL', { type: Sequelize.QueryTypes.SELECT}
        ).then((resp) => {
          data = resp;
          return queryInterface.removeColumn('cart', 'address_id').then(() => {
            return queryInterface.addColumn(
              'cart',
              'address_id',
              {
                type: Sequelize.INTEGER,
                references: {
                  model: "address",
                  key: "id"
                },
                onUpdate: 'SET NULL',
                onDelete: 'SET NULL'
              }
            ).then(() => {
              data.map(d => {
                return queryInterface.sequelize.query(`UPDATE cart SET address_id=${d.address_id} WHERE id=${d.id}`)
              })
            })
          });
        });
      });
    })
  },

  down: function (queryInterface, Sequelize) {
  }
};
