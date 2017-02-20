import db from '../../models';

export default function load(req) {
  return db.order_modifiers.destroy({where: {order_id: req.body.order_id}});
}
