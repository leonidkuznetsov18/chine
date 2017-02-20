import memoize from 'lru-memoize';
import { createValidator, requiredField, matchLenght, maxLength, minLength, cardNumberValidator } from 'utils/validation';

const registerValidation = createValidator({
  cardNumber: [requiredField('Card number'), maxLength(16, 'Card number'), minLength(13, 'Card number'), cardNumberValidator()],
  expDate: [requiredField('Expiration date'), matchLenght(4, 'Expiration date')],
  cvc: [requiredField('CVC code'), matchLenght(3, 'CVC code')]
});
export default memoize(10)(registerValidation);
