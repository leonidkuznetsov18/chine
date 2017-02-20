import db from '../../models';
import email_send from '../../mandrill/mandrill-service.js';

export default function list(req) {
  if (req.query.category) {
    return db.product.findAll({
      include: [{
        model: db.badge
      }, {
        model: db.category,
        where: [{id: parseInt(req.query.category)}]
      }],
      order: [['sorting', 'ASC']]
    })
  } else {
    return db.product.findAll({
      include: [{
        model: db.badge
      }, {
        model: db.category
      }],
      order: [['sorting', 'ASC']]
    })
  }
}
