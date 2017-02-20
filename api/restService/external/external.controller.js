import db from '../../models'

import {getDrivers} from './../../utils/bringg';

export default class ExternalController {
  
  static async driversList(req, res){
    res.json(await getDrivers())
  }
  
  static async updateOrderOnTheWay(req, res){
    const {uuid, user_id} = req.body;
    const carts = await db.cart.findAll({
      where: {
        bringg_uiid: uuid,
        bringg_driver_id: user_id
      },
      include: [
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
    });
    const newStatus = await db.status.findById(5);
    carts.map(cart => {
      cart.setStatus(newStatus)
    });
    res.send(200);
  }
  
  static async updateOrderCompleted(req, res){
    const {uuid, user_id} = req.body;
    const carts = await db.cart.findAll({
      where: {
        bringg_uiid: uuid,
        bringg_driver_id: user_id
      },
      include: [
        {model: db.user},
        {model: db.address}, {
          model: db.order,
          include: [{model: db.product}, {
            model: db.order_modifiers,
            include: [{model: db.modifier}]
          },]
        }, {
          model: db.status,
        }],
    });
    const newStatus = await db.status.findById(6);
    carts.map(cart => {
      cart.setStatus(newStatus)
    });
    res.send(200)
  }
}