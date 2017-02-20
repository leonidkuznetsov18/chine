import db from '../../models';
import getCart from '../../utils/getCart';

export default async function change_count(req) {
  
  const { order_id, count } = req.body;
  const order = await db.order.findById(order_id, {include: [{model: db.cart}]});
  return order.update({count: count}).then(() => {
    return getCart(order.carts[0].id)
  });
}
