import db from '../../models';

export default function address_remove(req) {
  return db.address.destroy({where: {id: req.body.address_id}});
}
