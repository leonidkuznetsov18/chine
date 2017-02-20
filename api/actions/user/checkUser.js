import db from '../../models';
import moment from 'moment';
import crypto from 'crypto';
import { recover_password } from '../../mandrill/mandrill-service.js';

export default function checkUser(req) {
  return db.user.findOne({
    attributes: ['id', 'email', 'phone'],
    where: {
      $or: [{email: req.query.name}, {phone: req.query.name}]
    }
  }).then((user) => {
    if (user && !req.query.hash) {
        const date = moment().add(3, 'days').format('llll');
        const hash = crypto.createHash('sha256').update(Date.now().toString()).digest('hex');
        db.password_recover.create({
          user_id: user.id,
          hash: hash,
          date_expired: date  
        });
        recover_password(user,hash);
    } else if (user && req.query.hash) {
      return db.subscribe.findOne({
        where: {
          hash: req.query.hash,
          $and : [{user_id: user.id}]
        }
      }).then(subscribe => {
        return subscribe.update({
          is_subscribe: false
        });
      });
    } else {
      return Promise.reject({});
    }
  })
}
