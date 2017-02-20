import db from '../../models'
export default class OrderController {

  static async orderList(req, res) {
    res.json(await db.order.findAll({
      include: [{
        model: db.order_modifiers,
        include: [{model: db.order},where: {count: {$gt: 0}}]
      }]
    }));
  }

  static async orderLoad(req, res) {
    res.json(await db.order.findById(req.params.id,{
      include: [{
        model: db.order_modifiers,
        include: [{model: db.modifier}]
      }, {
        model: db.cart
      }]
    }));
  }

  static async orderEdit(req, res) {
    const {
      id,
      modifiers
    } = req.body;

    const [order, created] = await db.order.findOrCreate({where: {id: id}});

    await order.update(req.body);
    await db.order_modifiers.destroy({where: {order_id: order.id}});

    const orderModifiers = [];
    modifiers.map(modifier => {
      orderModifiers.push({
        order_id: order.id,
        modifier_id: modifier.id,
        value: modifier.value
      });
    });

    await db.order_modifiers.bulkCreate(orderModifiers);

    res.json(order);
  }

  static async orderDelete(req, res) {
    await db.sequelize.query(
      `DELETE FROM cart_order WHERE order_id = ${req.params.id}`
    );
    res.json(db.order.destroy({where: {id: req.params.id}}));
  }

  static async extraAdd(req, res) {
    const { order_id, extra_id } = req.body;
    const extra = await db.extras.findById(extra_id);
    const order = await db.order.findById(order_id);

    const [orderExtra, created] = await db.order_extras.findOrCreate({
      where: {
        order_id: order_id, extras_id: extra_id
      }, defaults: {
        count: 1
      }});

    if(!created) {
      orderExtra.count += 1;
      await orderExtra.save();
    }
    res.json(order);
  }

  static async extraRemove(req, res) {
    res.json(await db.order_extras.destroy({where: {id: req.params.id}}));
  }
}
