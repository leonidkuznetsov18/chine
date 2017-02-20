import db from '../../models';

export default async function address_set_default(req) {
  const { user_id, address_id } = req.body;
  const address = await db.address.findById(address_id);

  await db.cart.update({address_id: address_id}, {where: {user_id: user_id, status_id: null}});
  await db.address.update({is_default: false}, {where: {user_id: user_id}});
  return await address.update({is_default: true})
}
