import db from '../../models';

export default function email(req) {
  return db.user.findOne({where: {email: req.query.email}}).then(res => !!res)
}
