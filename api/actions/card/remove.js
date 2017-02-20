import db from '../../models';

export default function address_remove(req) {
  return db.card.destroy({where: {id: req.body.card_id}});
}

