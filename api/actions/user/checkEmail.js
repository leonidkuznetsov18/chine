import db from '../../models';

export default function email(req) {
  const { email, id } = req.body;
  const q = {where: {email: email}};
  if (id) q.where = {...q.where, id: {$ne: id}};
  return db.user.findOne(q).then(res => !!res)
}
