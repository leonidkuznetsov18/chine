import db from '../../models';
import payProcess from '../payments'

import decrypt from '../../utils/decrypt';

function _decryptCard(card) {
  return {
    card_no: decrypt(card.card_no),
    exp_date: decrypt(card.exp_date),
    cvc: decrypt(card.cvc)
  }
}

export default async function payAuthorized(req) {
  const { user_id, amount } = req.body;
  try {
    const user = await db.user.findById(user_id);
    const cards = await user.getCards({where: {is_default: true}});
    if (cards.length) {
      let response = {transaction_id: null};
      if (amount > 0) {
        response = await payProcess({amount: amount, user_id: user_id, ..._decryptCard(cards[0])});
      }
      const cart = await db.cart.findOne({
        where: {user_id: req.body.user_id, status_id: null},
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
        }],
      });
      await cart.update({order_date: Date(), transaction_id: response.transaction_id, card_id: cards[0].id});
      if (cart.promo_code){
        const promoCode = await db.promo_code.findById(cart.promo_code_id);
        await promoCode.decrement('max_number_of_usages')
      }
      const status = amount <= 100 ? await db.status.findOne({where: {slug: 'order_received'}}) : await db.status.findOne({where: {slug: 'pending'}})
      await cart.setStatus(status);
      return response;
    } else {
      return Promise.reject({error: 'cards in null'})
    }
  } catch(e) {
    return Promise.reject({error: e})
  }
}