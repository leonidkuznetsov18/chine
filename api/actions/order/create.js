import db from '../../models';
import getCart from '../../utils/getCart';
import equal from 'deep-equal'

async function _setOrderModifiers(order, modifiers) {
  const orderModifiers = [];
  for (let ii = 0; ii < modifiers.length; ++ii) {
    if (modifiers[ii].value > 0) {
      orderModifiers.push({
        order_id: order.id,
        modifier_id: modifiers[ii].modifier.id,
        value: modifiers[ii].value});
    }
  }
  return await db.order_modifiers.bulkCreate(orderModifiers).then(() => {
    return order;
  });
}

export default function create(req) {
  const { user_id, product_id, modifiers } = req.body;
  return db.cart.findOne({
    where: {user_id: user_id, status_id: null},
    include: [
      {model: db.order, include: [{model: db.product}, {
        model: db.order_modifiers,
        include: [{model: db.modifier}]
      }]
    }]
  }).then(cart => {
    let _order = null;
    cart.orders.map(order => {
      if (orderIsSame(order, req.body)){
        _order = order
      }
    });
    if (_order) {
      _order.count += 1;
      _order.save();
      return getCart(cart.id);
    } else {
      return db.order.create({product_id: product_id, count: 1, is_default: false}).then((order => {
        return cart.addOrder(order).then(() => {
          return _setOrderModifiers(order, modifiers).then(() => {return getCart(cart.id)});
        });
      }));
    }
  });
}


function orderIsSame (order, request) {
  if (order.product_id !== request.product_id){
    return false;
  }
  if (!order.order_modifiers.length){
    return false
  }
  const orderModifiers = order.order_modifiers.map(item => {
    let item_ = item.toJSON();
    return {
      value: item_.value,
      modifier: item_.modifier
    }
  });
  const requestModifiers = request.modifiers.map(item => {
    return {
      value: item.value,
      modifier: item.modifier
    }
  });
  return equal(orderModifiers, requestModifiers)
}
