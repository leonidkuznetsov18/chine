import db from '../../models';

async function _setOrderModifiers(order, modifiers) {
  const orderModifiers = [];
  for (let ii = 0; ii < modifiers.length; ++ii) {
    if(modifiers[ii].value > 0){
      orderModifiers.push({
        order_id: order.id,
        modifier_id: modifiers[ii].modifier.id,
        value: modifiers[ii].value});
    }
  }
  return await db.order_modifiers.bulkCreate(orderModifiers);
}

export default function update(req) {

  const { order_id, modifiers } = req.body;

  return db.order.findById(order_id).then(order => {
    return order.update({is_default: 0}).then(() => {
      return _setOrderModifiers(order, modifiers);
    })
  });
}
