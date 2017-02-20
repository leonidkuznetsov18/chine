import db from '../../models';

export default function address_add(req) {
  return db.address.findById(req.query.address_id);
}
