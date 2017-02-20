import getCart from '../../utils/getCart';
import moment from 'moment';
import db from  '../../models';

export default async function setTime(req) {
  const { cart_id, time, isOpen, asap } = req.body;
  const cart = await getCart(cart_id);
  if (isOpen === false) {
    await cart.update({delivery_time: moment.utc(time).add(1, 'days'), asap: asap});
  } else {
    await cart.update({delivery_time: moment.utc(time), asap: asap});
  }
  return cart;
}
