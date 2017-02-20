const LOAD = 'client/categories/LOAD';
const LOAD_SUCCESS = 'client/categories/LOAD_SUCCESS';
const LOAD_FAIL = 'client/categories/LOAD_FAIL';

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
    default:
      return state;
  }
}


export function categoriesProduct() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/product/categories')
  };
}

export function categoriesExtras() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/extras/categories')
  };
}
