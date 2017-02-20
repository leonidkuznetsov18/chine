const SAVE = 'client/order/SAVE';
const SAVE_SUCCESS = 'client/order/SAVE_SUCCESS';
const SAVE_FAIL = 'client/order/SAVE_FAIL';

const CREATE = 'client/order/CREATE';
const CREATE_SUCCESS = 'client/order/CREATE_SUCCESS';
const CREATE_FAIL = 'client/order/CREATE_FAIL';

const REMOVE = 'client/order/REMOVE';
const REMOVE_SUCCESS = 'client/order/REMOVE_SUCCESS';
const REMOVE_FAIL = 'client/order/REMOVE_FAIL';

const initialState = {
  loaded: false,
  item: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
    case CREATE:
      return {
        ...state,
        loading: true
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case CREATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case REMOVE:
      return {
        ...state,
        loading: true
      };
    case REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case REMOVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function orderRemove(orderId) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.post('/order/remove', {
      data: {
        order_id: orderId
      }
    })
  };
}

export function orderUpdate(orderId, modifiers) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/order/update', {
      data: {
        order_id: orderId,
        modifiers: modifiers}
    })
  };
}
export function orderCreate(userId, productId, modifiers) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/order/create', {
      data: {
        user_id: userId,
        product_id: productId,
        modifiers: modifiers}
    })
  };
}

export function changeCounter(orderId, count) {
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
