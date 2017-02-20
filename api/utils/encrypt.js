import crypto from 'crypto';
import config from '../config';

export default function _encrypt(text) {
  var cipher = crypto.createCipher('aes-256-cbc', config.CARD_KEY)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
