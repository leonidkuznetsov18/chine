import db from '../../models';

export default async function updateCard(req) {
  const { card_id, user_id } = req.body;
  await db.card.update({
    is_default: false}, {
      where: {
        $and: [
          {
            is_default: true
          },
          {
            user_id: user_id
          }
        ]
      }
    }
  );
  return await db.card.update({
    is_default: true,
    user_id: user_id
  }, {
    where: {
      id: card_id
    }
  });
}
