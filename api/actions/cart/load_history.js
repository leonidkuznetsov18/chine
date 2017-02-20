import db from '../../models';

export default function load_history(req) {
  return db.cart.findAll({where: {user_id: req.query.user_id, status_id: {$ne: null}},
    include: [{model: db.order,
    where: {count: {$gt: 0}},
      include: [{model: db.product}]
    }],
    order: [['id', 'DESC']]})
}
