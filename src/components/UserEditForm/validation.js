import memoize from 'lru-memoize';
import { createValidator, requiredField, email, phoneValid } from 'utils/validation';

const registerValidation = createValidator({
  email: [requiredField('Email'), email],
  phone: [requiredField('Phone'), phoneValid(10, 'Phone number')],
});
export default memoize(10)(registerValidation);
