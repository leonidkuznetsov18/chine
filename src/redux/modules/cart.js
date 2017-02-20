export const LOAD = 'client/cart/LOAD';
export const LOAD_SUCCESS = 'client/cart/LOAD_SUCCESS';
export const LOAD_FAIL = 'client/cart/LOAD_FAIL';

export const SAVE = 'client/cart/SAVE';
export const SAVE_SUCCESS = 'client/cart/SAVE_SUCCESS';
export const SAVE_FAIL = 'client/cart/SAVE_FAIL';

export const PAY = 'client/cart/PAY';
export const PAY_SUCCESS = 'client/cart/PAY_SUCCESS';
export const PAY_FAIL = 'client/cart/PAY_FAIL';

export const VOID = 'client/cart/VOID';
export const VOID_SUCCESS = 'client/cart/VOID_SUCCESS';
export const VOID_FAIL = 'client/cart/VOID_FAIL';

export const STATUS_CHANGE = 'client/cart/STATUS_CHANGED';

export const APPLY_PROMO_CODE = 'client/cart/APPLY_PROMO_CODE';
export const APPLY_PROMO_CODE_SUCCESS = 'client/cart/APPLY_PROMO_CODE_SUCCESS';
export const APPLY_PROMO_CODE_FAIL = 'client/cart/APPLY_PROMO_CODE_FAIL';

export const REMOVE_PROMO_CODE = 'client/cart/REMOVE_PROMO_CODE';
export const REMOVE_PROMO_CODE_SUCCESS = 'client/cart/REMOVE_PROMO_CODE_SUCCESS';
export const REMOVE_PROMO_CODE_FAIL = 'client/cart/REMOVE_PROMO_CODE_FAIL';

export const TOGGLE_PICKUP = 'client/cart/TOGGLE_PICKUP';
export const TOGGLE_PICKUP_SUCCESS = 'client/cart/TOGGLE_PICKUP_SUCCESS';
export const TOGGLE_PICKUP_FAIL = 'client/cart/TOGGLE_PICKUP_FAIL';

export const GET_MARKS = 'client/cart/GET_MARKS';
export const GET_MARKS_SUCCESS = 'client/cart/GET_MARKS_SUCCESS';
export const GET_MARKS_FAIL = 'client/cart/GET_MARKS_FAIL';

export const CLEAN = 'client/cart/CLEAN';

export const SET_TIME = 'client/cart/SET_TIME';

export const REMOVE_PROMO_CODE_ERRORS = 'clent/cart/REMOVE_PROMO_CODE_ERRORS';

export const UPDATE = 'client/cart/UPDATE';
export const UPDATE_SUCCESS = 'client/cart/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'client/cart/UPDATE_FAIL';

export const UPDATE_NOTES = 'client/cart/UPDATE_NOTES';

export const initialState = {
  loaded: false,
  loading: true,
  item: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        promoCodeErrors: []
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.result,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case UPDATE:
      return {
        ...state,
        loading: true
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.result
      };
    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SAVE:
      return {
        ...state,
        loading: true
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.result
      };
    case SAVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case PAY:
      return {
        ...state,
        loading: true,
        preloader: true
      };
    case PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        preloader: false
      };
    case PAY_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        preloader: false,
        error: action.error
      };
    case STATUS_CHANGE:
      return {
        ...state,
        item: action.cart
      };
    case APPLY_PROMO_CODE:
      return {
        ...state,
        promoCodeErrors: []
      };
    case APPLY_PROMO_CODE_SUCCESS:
      return {
        ...state,
        item: action.result,
        loading: false
      };
    case APPLY_PROMO_CODE_FAIL:
      return {
        ...state,
        promoCodeErrors: action.error,
        loading: false
      };
    case REMOVE_PROMO_CODE:
      return {
        ...state,
        loading: true
      };
    case REMOVE_PROMO_CODE_SUCCESS:
      return {
        ...state,
        item: action.result,
        loading: false
      };
    case REMOVE_PROMO_CODE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case REMOVE_PROMO_CODE_ERRORS:
      return {
        ...state,
        promoCodeErrors: []
      };
    case TOGGLE_PICKUP:
      return {
        ...state,
        loading: true
      };
    case TOGGLE_PICKUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.result
      };
    case TOGGLE_PICKUP_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_MARKS:
      return {
        ...state,
        loading: true
      };
    case GET_MARKS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sliderMarks: action.result
      };
    case GET_MARKS_FAIL:
      return {
        ...state,
        loading: false
      };
    case CLEAN:
      return {
        ...state,
        loading: false,
        loaded: false,
        item: null
      };
    case SET_TIME:
      return {
        ...state,
        timeValue: action.value
      };
    case UPDATE_NOTES:
      return {
        ...state,
        notes: action.value
      }
    default:
      return state;
  }
}


export function cartStatusUpdated(cart) {
  return dispatch => {
    dispatch({
      type: STATUS_CHANGE,
      cart: cart
    });
  };
}

export function updateCart(cartId, userId, addressId, pickup) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.post('/cart/updateCart', {
      data: {
        cart_id: cartId,
        user_id: userId,
        address_id: addressId,
        pickup: pickup
      }
    })
  };
}

export function setTime(value) {
  return dispatch => {
    dispatch({
      type: SET_TIME,
      value: value
    });
  };
}

export function cartLoad(userId, cartStatus = null) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/cart/load', {
      params: {user_id: userId,
      cart_status: cartStatus}
    })
  };
}

export function cartLoadById(cartId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/cart/load_by_id', {
      params: {cart_id: cartId}
    })
  };
}

export function cartLoadHistory(userId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/cart/load_history', {
      params: {user_id: userId}
    })
  };
}

export function addToCart(userId, productId) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/cart/add_to_cart', {
      data: {
        user_id: userId,
        product_id: productId
      }
    })
  };
}


export function updateAdditionalItems(cartId, type, action, count = null) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/cart/update_additional', {
      data: {
        cart_id: cartId,
        type: type,
        action: action,
        count: count
      }
    })
  };
}

export function togglePickupOption(cartId, value) {
  return {
    types: [TOGGLE_PICKUP, TOGGLE_PICKUP_SUCCESS, TOGGLE_PICKUP_FAIL],
    promise: (client) => client.post('/cart/toggle_pickup', {
      data: {
        cart_id: cartId,
        pickup: value
      }
    })
  };
}

export function setDeliveryTime(cartId, time, asap, isOpen) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/cart/set_time', {
      data: {
        cart_id: cartId,
        time: time,
        isOpen: isOpen,
        asap: asap
      }
    })
  };
}

export function pay(amount, userId, phone, cardNumber = null, expDate = null, cvc = null) {
  return {
    types: [PAY, PAY_SUCCESS, PAY_FAIL],
    promise: (client) => client.post('/cart/pay', {
      data: {
        amount: amount,
        user_id: userId,
        phone: phone,
        card_no: cardNumber,
        exp_date: expDate,
        cvc: cvc
      }
    })
  };
}

export function payAuthorized(userId, amount) {
  return {
    types: [PAY, PAY_SUCCESS, PAY_FAIL],
    promise: (client) => client.post('/cart/pay_authorized', {
      data: {
        amount: amount,
        user_id: userId
      }
    })
  };
}

export function applyPromoCode(data) {
  return {
    types: [APPLY_PROMO_CODE, APPLY_PROMO_CODE_SUCCESS, APPLY_PROMO_CODE_FAIL],
    promise: (client) => client.post('/cart/apply_promo_code', {data: data})
  };
}

export function removePromoCode(cartId) {
  return {
    types: [REMOVE_PROMO_CODE, REMOVE_PROMO_CODE_SUCCESS, REMOVE_PROMO_CODE_FAIL],
    promise: (client) => client.post('/cart/remove_promo_code', {data: {cart_id: cartId}})
  };
}

export function clearPromoCodeErrors() {
  return dispatch => {
    dispatch({
      type: REMOVE_PROMO_CODE_ERRORS
    });
  };
}

export function changeProductsCounter(orderId, count) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/order/change_count', {
      data: {
        order_id: orderId,
        count: count
      }
    })
  };
}

export function changeExtraCounter(orderId, extrasId, count, cartId) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/extras/change_count', {
      data: {
        order_id: orderId,
        extras_id: extrasId,
        count: count,
        cartId: cartId
      }
    })
  };
}

export function voidTransaction(cartId) {
  return {
    types: [VOID, VOID_SUCCESS, VOID_FAIL],
    promise: (client) => client.post('/cart/void_transaction', {
      data: {
        cart_id: cartId
      }
    })
  };
}


export function getSliderMarks() {
  return {
    types: [GET_MARKS, GET_MARKS_SUCCESS, GET_MARKS_FAIL],
    promise: (client) => client.get('/cart/get_slider_marks')
  };
}

export function clean() {
  return {type: CLEAN};
}

export function updateNotes(value) {
  return dispatch => {
    dispatch({
      type: UPDATE_NOTES,
      value: value
    });
  };
}
