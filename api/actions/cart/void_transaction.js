import db from '../../models';
import { voidTransaction } from '../payments'

export default async function voidTrans(req) {
  try {
    const { cart_id } = req.body;
    const cart = await db.cart.findById(cart_id);
    await voidTransaction(cart.transaction_id);
    const status = await db.status.findOne({where: {slug: 'canceled'}});
    await cart.update({status_id: status.id});
    return cart;
  } catch (e) {
    console.log('Void Transaction Unsuccess:\n', e);
    return Promise.reject({error: e});
  }
}

