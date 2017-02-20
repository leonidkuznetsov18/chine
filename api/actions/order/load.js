import db from '../../models';

export default function load(req) {

  const { user_id, product_id } = req.query;
  return db.cart.findOne({
    where: {user_id: user_id},
    include: [{
      model: db.order,
      where: {product_id: product_id},
      include: [{model: db.order_modifiers,
        include: [{model: db.modifier}]
      }, {model: db.product}]},
    ]
  }).then(cart => {
    if (cart.orders[0]){
      return cart.orders[0];
    } else {
      return new Promise.reject({});
    }
  })
}
