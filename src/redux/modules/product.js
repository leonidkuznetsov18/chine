const LOAD = 'client/product/LOAD';
const LOAD_SUCCESS = 'client/product/LOAD_SUCCESS';
const LOAD_FAIL = 'client/product/LOAD_FAIL';

const GET_KITCHEN_TIME = 'client/product/GET_KITCHEN_TIME';
const GET_KITCHEN_TIME_SUCCESS = 'client/product/GET_KITCHEN_TIME_SUCCESS';
const GET_KITCHEN_TIME_FAIL = 'client/product/GET_KITCHEN_TIME_FAIL';

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
        loaded: true,
        preloader: false,
        items: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        preloader: false,
        error: action.error
      };
    case GET_KITCHEN_TIME:
      return {
        ...state,
        loading: true
      };
    case GET_KITCHEN_TIME_SUCCESS:
      return {
        loading: false,
        loaded: true,
        kitchenWorking: action.result
      };
    case GET_KITCHEN_TIME_FAIL:
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


export function getProducts(category) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/product/list', {
      params: {category: category}
    })
  };
}

export function kitchenWorking() {
  return {
    types: [GET_KITCHEN_TIME, GET_KITCHEN_TIME_SUCCESS, GET_KITCHEN_TIME_FAIL],
    promise: (client) => client.get('/kitchenTime')
  };
}
