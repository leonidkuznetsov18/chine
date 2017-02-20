import db from '../../models';

export default function phone(req) {
  const { phone, id, userId } = req.body;
  const q = {where: {phone: phone}};
  if (userId || id) q.where = {...q.where, id: {$ne: userId || id}};
  return db.user.findOne(q).then(res => !!res)
}
