import db from '../../models';


export default async function removePromoCode(req){
  
  const {cart_id} = req.body;
  const cart = await db.cart.findById(cart_id, {
    include: [
      {model: db.user},
      {model: db.promo_code},
      {model: db.address}, {
        model: db.order,
        include: [{model: db.product}, {
          model: db.order_modifiers,
          include: [{model: db.modifier}]
        }]
      }, {
        model: db.status,
      }]
  });
  await cart.setDataValue('promo_code', null);
  await cart.setPromo_code(null);
  return cart;
}