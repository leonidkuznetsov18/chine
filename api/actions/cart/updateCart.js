import db from '../../models';

export default async function updateCart(req) {
  const { cart_id, user_id, address_id, pickup } = req.body;
  await db.cart.destroy({
    where: {
      $and: [
        {
          status_id: null
        }, {
          user_id: user_id
        }
      ]
    }
  });
  if (!pickup) {
    await db.address.update({
      is_default: false
    }, {
      where: {
        $and: [
          {
            is_default: true
          }, {
            user_id: user_id
          }
        ]
      }
    }
    );
    await db.address.update({
      is_default: true,
      user_id: user_id
    }, {
      where: {
        id: address_id
      }
    }
    );
  }
  const address = await db.address.findOne({
    where: {
      $and: [
        {
          is_default: true
        }, {
          user_id: user_id
        }
      ]
    }
  });
  const cart = await db.cart.update({
    user_id: user_id, address_id: address.id
  }, {
    where: {
      id: cart_id
    }
  }
  );
  return cart;
}
