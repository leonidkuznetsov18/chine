import db from '../models';


export default async function getCart(cartId){
  return await db.cart.findById(cartId, {
    include: [
      {model: db.user},
      {model: db.promo_code},
      {model: db.address},
      {model: db.order, include: [{model: db.product}, {
          model: db.order_modifiers,
          include: [{model: db.modifier}]
        }]
      }, {
        model: db.status,
      }],
  })
}
