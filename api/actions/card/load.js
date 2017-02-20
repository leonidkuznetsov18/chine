import db from '../../models';
import crypto from 'crypto';
import config from '../../config';

function _decrypt(text){
  var decipher = crypto.createDecipher('aes-256-cbc', config.CARD_KEY)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

function _decryptCard(card) {
  let _card = {};
  for (const key in card) {
    _card[key] = _decrypt(card[key]);
  }
  return _card;
}

export default function loadCard(req) {
  const { user_id } = req.query;
  return db.card.findOne({
    where: {user_id: user_id, is_default: true}
  }).then(card => {
    const _card = _decryptCard({card_no: card.card_no, exp_date: card.exp_date, cvc: card.cvc});
    return {card_no: _card.card_no.slice(-4), exp_date: _card.exp_date}
  });
}
