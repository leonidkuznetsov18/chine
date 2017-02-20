const LOAD = 'client/modifiers/LOAD';
const LOAD_SUCCESS = 'client/modifiers/LOAD_SUCCESS';
const LOAD_FAIL = 'client/modifiers/LOAD_FAIL';

const REMOVE_PRODUCT_DETAIL = 'client/modifiers/REMOVE_PRODUCT_DETAIL';

const initialState = {
  loaded: false,
  details: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        details: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case REMOVE_PRODUCT_DETAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        details: []
      };
    default:
      return state;
  }
}


export function getProductDetails(productId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/product/details', {
      params: {product_id: productId}
    })
  };
}

export function clearProductDetails() {
  return dispatch => {
    dispatch({
      type: REMOVE_PRODUCT_DETAIL
    });
  };
}
