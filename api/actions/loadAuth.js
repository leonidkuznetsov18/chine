import db from '../models';
import config from '../config'

export default function loadAuth(req) {
  return db.user.findOne({
    where: {token: req.query.token},
    attributes: ['id', 'email', 'phone', 'is_active', 'first_name', 'last_name', 'token', 'is_catering'],
    include: [{
      model: db.address,
      required: false
    }, {
      model: db.card,
      attributes: ['id'],
      where: {is_default: true},
      required: false
    }]
  });
}
