import db from '../../models';

import {applyPromoCode} from '../../utils/promo_code';
import getCart from '../../utils/getCart';

export default async function apply_promo_code(req){
  const {cart_id, promo_code} = req.body;
  const promoCode = await db.promo_code.findOne({
    where: {
      name: promo_code
    }
  });
  const cart = await getCart(cart_id);
  try {
    const errors = applyPromoCode(promoCode.toJSON(), cart.toJSON());
    if (!errors.length){
      await cart.setPromo_code(promoCode);
      await cart.setDataValue('promo_code', promoCode);
      return cart;
    } else {
      return Promise.reject(errors)
    }
  } catch (e){
    return Promise.reject(['This promo code is invalid'])
  }
  
}