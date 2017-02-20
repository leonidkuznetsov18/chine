import db from '../../models';
import moment from 'moment';
import crypto from 'crypto';
import { recover_password } from '../../mandrill/mandrill-service.js';

export default function check_user(req) {
  return db.user.findOne({
    attributes: ['id', 'email', 'phone'],
    where: {
      $or: [{email: req.query.name}, {phone: req.query.name}]
    }
  }).then((user) => {
    if (user) {
        const date = moment().add(3, 'days').unix();
        const hash = crypto.createHash('sha256').update(Date.now().toString()).digest('hex');
        db.password_recover.create({
          user_id: user.id,
          hash: hash,
          date_expired: date
        });
        recover_password(user,hash);
    } else {
      return Promise.reject({});
    }
  })
}
