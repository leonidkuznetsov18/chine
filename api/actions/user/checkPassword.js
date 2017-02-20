import db from '../../models';
import crypto from 'crypto';
import config from '../../config'
import jwt from 'jsonwebtoken';

export default function checkPassword(req) {
  const password = crypto.createHash('sha256')
                   .update(req.body.password)
                   .digest('hex');

  return db.user.findOne({
    attributes: ['id', 'email', 'phone'],
    where: {
      $or: [{email: req.body.name}, {phone: req.body.name}],
      $and: [{password: password}]
    }
  }).then(user => {
    if (!user) return Promise.reject({});
    return user;
  })
}
