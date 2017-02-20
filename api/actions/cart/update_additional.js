import getCart from '../../utils/getCart'
/**
 * Handle update cart additional items like utensils, chopsticks etc.
 * Invoked with `decrement` or `increment` param. To set value
 * directly you need to pass `count` param directly, then `action` param
 * will be ignored.
 * @param req
 * @returns {*}
 */
export default async function updateAdditional(req) {

  const { cart_id, type, action, count } = req.body;
  const cart = await getCart(cart_id);

  if (count){
    await cart.update({
      [type]: count
    })
  } else {
    if (!cart[type]){
      await cart.update({
        [type]: 1
      });
    } else {
      await cart[action](type);
    }
  }
  await cart.reload();
  return cart;
}
