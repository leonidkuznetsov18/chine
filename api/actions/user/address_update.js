import db from '../../models';

export default function address_update(req) {
  const { address_id, data } = req.body;
  return db.address.findById(address_id).then(address => {
    return address.update({
      company: data.company,
      apt_floor: data.aptFloorSuite,
      notes: data.notes
    })
  });
}
