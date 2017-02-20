const LOAD = 'client/order-history/LOAD';
const LOAD_SUCCESS = 'client/order-history/LOAD_SUCCESS';
const LOAD_FAIL = 'client/order-history/LOAD_FAIL';

const initialState = {
  loaded: false,
  items: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        preloader: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        preloader: false,
        loaded: true,
        items: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        preloader: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function load(userId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/cart/load_history', {
      params: {user_id: userId}
    })
  };
}
