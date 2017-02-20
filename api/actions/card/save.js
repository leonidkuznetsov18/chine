import db from '../../models';
import crypto from 'crypto';
import config from '../../config';
import encrypt from '../../utils/encrypt';

export default async function saveCard(req) {
  const { user_id, is_default, data } = req.body;
  if (is_default) {
    db.card.update({is_default: false}, {where: {user_id: user_id}})
  }
  const card = await db.card.findOrCreate({
    where: {
      user_id: user_id,
      card_no: encrypt(data.cardNumber)},
    defaults: {
      exp_date: encrypt(data.expDate),
      cvc: encrypt(data.cvc),
      is_default: is_default
    }});
  return !!card[0];
}
