import db from '../../models';
import moment from 'moment';
import crypto from 'crypto';

export default function checkHash(req) {
  return db.password_recover.findOne({
    where: {
       hash: req.query.hash,
       is_used: false,
       date_expired: { gt: moment().unix() }
    }
  }).then((password_recover) => {
      if(password_recover){
        return password_recover.update({
          is_used: true
        }).then(() => {
          return {user_id: password_recover.user_id};
        })
      } else {
       return Promise.reject({});
      }
  })
}
