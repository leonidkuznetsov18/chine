import memoize from 'lru-memoize';
import { createValidator, requiredField, phoneValid} from 'utils/validation';

const phoneValidation = createValidator({
  phone: [requiredField('Phone'), phoneValid(10, 'Phone number')],
});
export default memoize(10)(phoneValidation);
