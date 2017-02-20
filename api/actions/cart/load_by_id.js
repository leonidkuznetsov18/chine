import db from '../../models';

export default function load(req) {
  const { cart_id } = req.query;
  return db.cart.findById(cart_id, {
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
}
