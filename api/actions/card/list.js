import db from '../../models';
import crypto from 'crypto';
import config from '../../config';

function _decrypt(text){
  var decipher = crypto.createDecipher('aes-256-cbc', config.CARD_KEY)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

function _decryptCards(cards) {
  const _cards = [];
  for (let i = 0; i < cards.length; ++i) {
    let _card = {};
    _card['id'] = cards[i].id;
    _card['card_no'] = _decrypt(cards[i].card_no).slice(-4);
    _card['exp_date'] = _decrypt(cards[i].exp_date);
    _card['is_default'] = cards[i].is_default;
    _cards.push(_card);
  }
  return _cards;
}

export default function cardList(req) {
  const { user_id } = req.query;
  return db.user.findById(user_id).then(user => {
    return user.getCards().then(cards => {
      return _decryptCards(cards);
    });
  })
}
