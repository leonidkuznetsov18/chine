import db from '../../models';

export default function load(req) {
  if (req.query.cart_status) {
    return db.cart.findOne({where: {user_id: req.query.user_id},
      include: [
        {model: db.promo_code},
        {model: db.address}, {

          model: db.order,
          include: [{model: db.product}, {
            model: db.order_modifiers,
            include: [{model: db.modifier}]
          }]
        }, {
        model: db.status,
        }],
    order: [['id', 'DESC']]})
  } else {
    return db.cart.findOrCreate({where: {user_id: req.query.user_id, status_id: null},
      include: [
        {model: db.promo_code},
        {model: db.address}, {
          model: db.order,
          include: [{model: db.product}, {
            model: db.order_modifiers,
            include: [{model: db.modifier}]
          }]
        }, {model: db.status}]
    }).then(response => {
      const cart = response[0];
      const created = response[1];
      if (created) {
        return cart.getUser().then(user => {
          return user.getAddresses({where: {is_default: true}}).then(addresses => {
            if (addresses.length > 0) {
              return cart.setAddress(addresses[0]).then(() => {
                return cart
              })
            }
          })
        });
      } else {
        return cart;
      }
    })
  }
}
