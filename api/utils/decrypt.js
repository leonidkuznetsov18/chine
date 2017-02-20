import crypto from 'crypto';
import config from '../config';

export default function _decrypt(text){
  var decipher = crypto.createDecipher('aes-256-cbc', config.CARD_KEY)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
