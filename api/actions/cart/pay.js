import db from '../../models';
import payProcess from '../payments'
import encrypt from '../../utils/encrypt';

function decryptCard(card) {
  return {
    card_no: decrypt(card.card_no),
    exp_date: decrypt(card.exp_date),
    cvc: decrypt(card.cvc)
  }
}

export default async function pay(req) {
  const { card_no, exp_date, cvc, phone, user_id, amount } = req.body;
  try {
    let response = Promise.resolve({});
    if (amount > 0) {
      response = await payProcess(req.body);
    }
    const cart = await db.cart.findOne({
      where: {user_id: user_id, status_id: null},
      include: [
        {model: db.user},
        {model: db.promo_code},
        {model: db.address},
        {model: db.order, include: [{model: db.product}, {
          model: db.order_modifiers,
          include: [{model: db.modifier}]
        }]
        }, {
          model: db.status,
        }],
    });
    if (amount > 0) {
      const card = await db.card.create({
        card_no: encrypt(card_no),
        exp_date: encrypt(exp_date),
        cvc: encrypt(cvc)
      });
      await cart.update({order_date: new Date(), transaction_id: response.transaction_id, card_id: card.id});
    } else {
      await cart.update({order_date: new Date()});
    }
    const promoCode = await cart.getPromo_code();
    if (promoCode) {
      await promoCode.decrement('max_number_of_usages');
    }
    const user = await cart.getUser();
    await user.update({phone: phone});
    const status = amount <= 100 ? await db.status.findOne({where: {slug: 'order_received'}}) : await db.status.findOne({where: {slug: 'pending'}})
    await cart.setStatus(status);
    return response;
  } catch (e) {
    return Promise.reject({error: e});
  }
}

/**
 * Future improvement: handle all payments in single method.
 */
export async function pay_(req){
  const {
    card_no,
    exp_date,
    cvc,
    phone,
    user_id,
    amount
  } = req.body;
  const user = await db.user.findById(user_id);
  const cart = await db.cart.findOne({
    where: {
      user_id: user_id,
      status_id: null
    },
    include: [
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
        model: db.status,
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
      }
    ]
  });
  if (amount > 0){
    let card;
    if (card_no && exp_date && cvc && phone){
      card = await db.card.create({
        card_no: encrypt(card_no),
        exp_date: encrypt(exp_date),
        cvc: encrypt(cvc)
      });
      await user.update({
        phone: phone
      })
    } else {
      card = await user.getCards({
        where: {
          is_default: true
        }
      })[0]
    }
    try {
      const response = await payProcess({
        amount: amount,
        user_id: user_id,
        ...decryptCard(card)
      });
    } catch (e){
      return Promise.reject({
        errors: e
      })
    }
  }
}
