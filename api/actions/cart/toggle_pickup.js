import getCart from '../../utils/getCart';

export default async function togglePickupOption(req) {
  
  const { cart_id, pickup } = req.body;
  
  const cart = await getCart(cart_id);
  await cart.update({pickup: pickup});
  return cart;
}

