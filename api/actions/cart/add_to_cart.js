import db from '../../models';
import _ from 'lodash';

/**
 * Handle adding products to cart. Returns updated cart
 * so you don't need to preform additional query.
 * @param req
 * @returns {*|Promise<R>|Promise.<TResult>|Request|Promise<R2|R1>}
 */
export default function add_to_cart(req) {

  const { user_id, product_id } = req.body;

  return db.cart.findOne({
    where: {
      user_id: user_id,
      status_id: null
    },
    include: [
      {
        model: db.status,
      },
      {
        model: db.user
      },
      {
        model: db.promo_code
      },
      {
        model: db.address
      },
      {
        model: db.order,
        include: [
          {
            model: db.product
          },
          {
            model: db.order_modifiers,
            include: [
              {
                model: db.modifier
              }
            ]
          }
        ]
      },
    ]
  }).then(cart => {
    return cart.getOrders({
      where: {
        product_id: product_id
      },
      include: [{model: db.order_modifiers}]
    }).then(orders => {
      const orderWOModifiers = orders.length ?
        _.find(orders, order => {return !order.order_modifiers.length;}) :
        false;
      if (orderWOModifiers) {
        return orderWOModifiers.increment('count').then(() => {
          return cart.reload().then(cart => {
            return cart
          })
        })
      } else {
        return db.order.create({
          product_id: product_id,
          count: 1
        }).then(order => {
          return cart.addOrder(order).then(() => {
            return cart.reload().then(cart => {
              return cart
            })
          });
        })
      }
    })
  })
}
