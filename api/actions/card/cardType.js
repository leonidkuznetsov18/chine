import db from '../../models';
import crypto from 'crypto';
import config from '../../config';

function _decrypt(text){
  var decipher = crypto.createDecipher('aes-256-cbc', config.CARD_KEY)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

function cardNumberValidator(value) {
    switch (true) {
      case /^(?:3[47][0-9]{13})$/.test(value): // American Express
        return 'American Express';
      case /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(value): // Visa 1
        return 'Visa';
      case /^5[1-5]\d{14}$/.test(value): // MasterCard
        return 'MasterCard';
      case /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/.test(value): // Discover Card
        return 'Discover';
      case /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/.test(value): // Diners Club Card
        return 'Diners Club';
      case /^35(?:2[89]|[3-8]\d)\d{12}$/.test(value): // JCB Card
        return 'JCB';
      case /^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/.test(value): // Maestro
        return 'Maestro';
      default:
        return '';
    }
}

function _decryptCards(card) {
  const cardNumber = _decrypt(card.card_no).slice(-4);
  const cardType = cardNumberValidator(_decrypt(card.card_no));
  return {cardType: cardType, cardNumber: cardNumber};
}

export default async function cardType(req) {
  const { user_id } = req.query;
  const card = await db.card.findOne({
    where: {$and: [{is_default: true}, {user_id: user_id}]}
  });
  return _decryptCards(card);
}
