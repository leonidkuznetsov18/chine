const LOAD = 'client/config/LOAD';
const LOAD_SUCCESS = 'client/config/LOAD_SUCCESS';
const LOAD_FAIL = 'client/config/LOAD_FAIL';

const HOME_CATEGORY_FILTER_CHANGE = 'client/config/HOME_CATEGORY_FILTER_CHANGE';

const initialState = {
  loaded: false,
  activeFilter: null
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
        item: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        preloader: false,
        error: action.error
      };
    case HOME_CATEGORY_FILTER_CHANGE:
      return {
        ...state,
        activeFilter: action.payload
      };
    default:
      return state;
  }
}


export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/config')
  };
}


export function changeCategoryFilter(newValue) {
  return dispatch => {
    dispatch({
      type: HOME_CATEGORY_FILTER_CHANGE,
      payload: newValue
    });
  };
}
