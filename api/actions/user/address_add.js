import db from '../../models';

export default function address_add(req) {
  return db.address.create(req.body).then(address => {
    return db.cart.findOrCreate({where: {user_id: req.body.user_id, status_id: null}}).then(result => {
      const cart = result[0];
      const created = result[1];
      return db.user.findById(req.body.user_id).then(user => {
        return user.getAddresses({where: {is_default: true}}).then(addresses => {
          if (addresses.length === 0) {
            return address.update({is_default: true}).then(() => {
              return cart.setAddress(address);
            });
          } else {
            return address;
          }
        })
      })
    })
  })
}
