import db from '../../models';
import crypto from 'crypto';
import { email_send } from '../../mandrill/mandrill-service.js';

function _prepareData (obj) {
  const { email, phone, password, firstName, lastName, isActive } = obj;
  let _email = email;
  let _password = password;
  if (!isActive) {
    _email = crypto.createHash('sha256').update(Date.now().toString()).digest('hex');
    _password = 'newPassword';
  }


  _password = crypto.createHash('sha256')
    .update(_password)
    .digest('hex');

  return {
    email: _email,
    phone: phone,
    password: _password,
    first_name: firstName,
    last_name: lastName,
    is_active: isActive
  };
}

export default async function register(req) {
  const [user, created] = await db.user.findOrCreate({where: {id: req.body.id}, defaults: _prepareData(req.body)});
  if (!created) {
    user.update(_prepareData(req.body));
  }
  const _hash = crypto.createHash('sha256').update(Date.now().toString()).digest('hex');
  await db.subscribe.create({
    user_id: user.id,
    hash: _hash,
  });
  if (user && user.is_active) {
    email_send(user, _hash);
  }
  return {id: user.id, email: user.email};
}
