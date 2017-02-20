import db from '../../models';
import crypto from 'crypto';
import config from '../../config'
import jwt from 'jsonwebtoken';

export default function login(req) {
  const password = crypto.createHash('sha256')
                   .update(req.body.password)
                   .digest('hex');

  return db.user.findOne({
    attributes: ['id', 'email', 'phone', 'is_active', 'first_name', 'last_name', 'is_catering'],
    where: {
      $or: [{email: req.body.name}, {phone: req.body.name}],
      $and: [{password: password}]
    },
    include: [{
      model: db.address,
      required: false
    }, {
      model: db.card,
      attributes: ['id'],
      where: {is_default: true},
      required: false
    }]
  }).then((user) => {
    if (user) {
      const token = crypto.createHash('sha256').update(`${req.body.name}-${req.body.password}`).digest('hex');
      return user.update({token: token}).then(() => {
        return Promise.resolve({
          token: token,
          ...user.get({json: true})
        })
      })
    } else {
      return Promise.reject({});
    }
  });
}
