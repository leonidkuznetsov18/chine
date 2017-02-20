import memoize from 'lru-memoize';
import { createValidator, requiredField, email, password, phoneValid } from 'utils/validation';

const registerValidation = createValidator({
  email: [requiredField('Email'), email],
  phone: [requiredField('Phone'), phoneValid(10, 'Phone number')],
  password: [requiredField('Password'), password(6)],
});
export default memoize(10)(registerValidation);

