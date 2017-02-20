import db from '../../models'
import {createBringTask} from '../../utils/bringg';
import { GroupController } from '../../utils/idPool';

const idPool = new GroupController();

export default class CartController {

  static async cartList(req, res) {
    res.json(await db.cart.findAll({
      include: [
        {model: db.promo_code},
        {model: db.user},
        {model: db.address}, {
          model: db.order,
          include: [{model: db.product}, {
            model: db.order_modifiers,
            include: [{model: db.modifier}]
          }]
        }, {
          model: db.status,
        }],
      order: [['id', 'DESC']]
    }));
  }

  static async dashboardCartList(req, res) {
    res.json(await db.cart.findAll({
      where: {
        status_id: {
          $in: [1, 2, 3, 4, 5]
        }
      },
      include: [
        {model: db.promo_code},
        {model: db.user},
        {model: db.address}, {
          model: db.order,
          include: [{model: db.product}, {
            model: db.order_modifiers,
            include: [{model: db.modifier}]
          }]
        }, {
          model: db.status,
        }],
      order: [['id', 'DESC']]
    }))
  }

  static async cartStatusUpdate(req, res) {
    const { id, status_id } = req.body;
    const cart = await db.cart.findById(id, {
      include: [
        {model: db.promo_code},
        {model: db.user},
        {model: db.address}, {
          model: db.order,
          include: [{model: db.product}, {
            model: db.order_modifiers,
            include: [{model: db.modifier}]
          }]
        }, {
          model: db.status,
        }],
      order: [['id', 'DESC']]});
    // set group for single order
    if ([1, 2].includes(cart.status_id) && status_id == 3) {
      const tempGroupId = idPool.reserve();
      await cart.update({
        temp_group_id: tempGroupId.id
      });
    }
    // remove group from single order
    if ([3, 4].includes(cart.status_id) && cart.temp_group_id !== null) {
      idPool.release(cart.temp_group_id);
      await cart.update({
        temp_group_id: null
      })
    }
    await cart.setStatus(await db.status.findById(status_id));
    res.json(cart);
  }

  static async cartStatusBulkUpdate(req, res) {
    const {ids, status_id} = req.body;
    const newStatus = await db.status.findById(status_id);
    const carts = await db.cart.findAll({
      where: {
        id: {
          $in: ids
        }
      },
      include: [
        {model: db.promo_code},
        {model: db.user},
        {model: db.address}, {
          model: db.order,
          include: [{model: db.product}, {
            model: db.order_modifiers,
            include: [{model: db.modifier}]
          }]
        }, {
          model: db.status,
        }]
    });
    if ([3, ].includes(status_id)) {
      const tempGroupId = idPool.reserve();
      await db.cart.update({
        temp_group_id: tempGroupId.id
      }, {
        where: {
          id: {
            $in: ids
          }
        }
      });
    }
    carts.map(cart => {
      cart.setStatus(newStatus);
    });
  }

  static async cartAssignmentUpdate(req, res) {
    const {driverId, selectedGroup} = req.body;
    const carts = await db.cart.findAll({
      where: {
        id: {
          $in: selectedGroup
        }
      },
      include: [
        {model: db.promo_code},
        {model: db.user},
        {model: db.address}, {
          model: db.order,
          include: [{model: db.product}, {
            model: db.order_modifiers,
            include: [{model: db.modifier}]
          }]
        }, {
          model: db.status,
        }],
      order: [['id', 'DESC']]
    });
    const bringgTask = await createBringTask(carts, driverId);
    await carts.map(cart => {
      cart.update({
        bringg_uiid: bringgTask.data.task.uuid,
        bringg_driver_id: driverId
      })
    });
    res.json(carts)
  }
  static async cartLoad(req, res) {
    res.json(await db.cart.findById(req.params.id, {
      include: [
        {model: db.promo_code},
        {model: db.address},
        {model: db.status},
        {model: db.user}, {
        model: db.order,
        include: [
          {model: db.order_modifiers,
            include: [{model: db.modifier}]
          }, { model: db.product }]
      }]
    }));
  }

  static async cartEdit(req, res) {
    const [cart, created] = await db.cart.findOrCreate({where: {id: req.body.id}});
    await cart.update(req.body);
    res.json(cart);
  }

  static async cartProductAdd(req, res) {
    const { cartId, productId } = req.params;
    const cart = await db.cart.findById(cartId);
    const product = await db.product.findById(productId);
    const order = await db.order.create({count: 1});
    await order.setProduct(product);
    await cart.addOrder(order);
    res.json(cart)
  }
  static async cartRemove(req, res) {
    res.json(await db.cart.destroy({where: {id: req.params.id}}));
  }
}
