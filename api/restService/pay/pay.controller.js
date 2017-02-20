import db from '../../models'
import payProcess, {refund, voidTransaction} from '../../actions/payments'

import encrypt from '../../utils/encrypt';
import decrypt from '../../utils/decrypt';

export default class PayController {
  static async pay(req, res) {
    const { user_id, amount, card, id } = req.body;
    const cart = await db.cart.findById(id, {
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

    try {
      const payResult = await payProcess({...card, amount: amount});
      const st = amount >= 100 ? 'order_received' : 'pending';
      const status = await db.status.findOne({where: {slug: st}});
      if (payResult.transaction_id) {
        const [cardDb, created] = await db.card.findOrCreate({where: {
          card_no: encrypt(card.card_no),
          exp_date: encrypt(card.exp_date),
          cvc: encrypt(card.cvc),
          user_id: user_id
        }});
        await cart.update({transaction_id: payResult.transaction_id, order_date: new Date(), card_id: card.id});
        await cart.setStatus(status);
        res.json(cart);
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async refund(req, res) {
    const { cart_id, amount } = req.body;

    const cart = await db.cart.findById(cart_id);
    const card = await db.card.findById(cart.card_id);

    try {
      const refResult = await refund({
        card_no: decrypt(card.card_no),
        exp_date: decrypt(card.exp_date),
        amount: amount,
        transaction_id: cart.transaction_id
      });
      res.json(refResult);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async voidTrans(req, res) {
    const { cart_id } = req.body;

    const cart = await db.cart.findById(cart_id);

    try {
      await voidTransaction(cart.transaction_id);
      const status = await db.status.findOne({where: {slug: 'canceled'}});
      await cart.update({status_id: status.id});
      res.json(cart)
    } catch (e) {
      console.log('Void Transaction Unsuccess:\n', e);
      res.status(500).json(e);
    }
  }
}
