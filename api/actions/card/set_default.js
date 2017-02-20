import db from '../../models';

export default async function address_set_default(req) {
  const { user_id, card_id } = req.body;
  const card = await db.card.findById(card_id);

  await db.card.update({is_default: false}, {where: {user_id: user_id}});
  return await !!card.update({is_default: true});
}
