const REGISTER = 'client/register/REGISTER';
const REGISTER_SUCCESS = 'client/register/REGISTER_SUCCESS';
const REGISTER_FAIL = 'client/register/REGISTER_FAIL';

const EMAIL_EXISTS_CHECK = 'client/email/EMAIL_EXISTS_CHECK';
const EMAIL_EXISTS_CHECK_SUCCESS = 'client/email/EMAIL_EXISTS_CHECK_SUCCESS';
const EMAIL_EXISTS_CHECK_FAIL = 'client/email/EMAIL_EXISTS_CHECK_FAIL';

const PHONE_EXISTS_CHECK = 'client/phone/PHONE_EXISTS_CHECK';
const PHONE_EXISTS_CHECK_SUCCESS = 'client/phone/PHONE_EXISTS_CHECK_SUCCESS';
const PHONE_EXISTS_CHECK_FAIL = 'client/phone/PHONE_EXISTS_CHECK_FAIL';

const initialState = {
  loaded: false,
  user: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registering: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        user: action.result
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registering: false,
        registered: false,
        error: action.error
      };
    case EMAIL_EXISTS_CHECK:
      return {
        ...state,
        ifValidating: true,
        isExists: false
      };
    case EMAIL_EXISTS_CHECK_SUCCESS:
      return {
        ...state,
        ifValidating: false,
        isExists: true
      };
    case EMAIL_EXISTS_CHECK_FAIL:
      return {
        ...state,
        ifValidating: false,
        isExists: false
      };
    case PHONE_EXISTS_CHECK:
      return {
        ...state,
        ifValidating: true,
        isExists: false
      };
    case PHONE_EXISTS_CHECK_SUCCESS:
      return {
        ...state,
        ifValidating: false,
        isExists: true
      };
    case PHONE_EXISTS_CHECK_FAIL:
      return {
        ...state,
        ifValidating: false,
        isExists: false
      };
    default:
      return state;
  }
}

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/user/register', {
      data: data
    })
  };
}

export function isValidEmail(data) {
  return {
    types: [EMAIL_EXISTS_CHECK, EMAIL_EXISTS_CHECK_SUCCESS, EMAIL_EXISTS_CHECK_FAIL],
    promise: (client) => client.post('/user/checkEmail', {
      data
    })
  };
}

export function isValidPhone(data) {
  return {
    types: [PHONE_EXISTS_CHECK, PHONE_EXISTS_CHECK_SUCCESS, PHONE_EXISTS_CHECK_FAIL],
    promise: (client) => client.post('/user/check_phone', {
      data
    })
  };
}
