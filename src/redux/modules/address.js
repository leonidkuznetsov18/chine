const LOAD = 'client/address/LOAD';
const LOAD_SUCCESS = 'client/address/LOAD_SUCCESS';
const LOAD_FAIL = 'client/address/LOAD_FAIL';

const SAVE = 'client/address/SAVE';
const SAVE_SUCCESS = 'client/address/SAVE_SUCCESS';
const SAVE_FAIL = 'client/address/SAVE_FAIL';

const REMOVE = 'client/address/REMOVE';
const REMOVE_SUCCESS = 'client/address/REMOVE_SUCCESS';
const REMOVE_FAIL = 'client/address/REMOVE_FAIL';


const initialState = {
  loaded: false,
  item: {}
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
    case SAVE:
      return {
        ...state,
        loading: true,
        preloader: true
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        preloader: false,
        item: action.result
      };
    case SAVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        preloader: false,
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
        saved: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function removeAddress(addressId) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.post('/user/address_remove', {
      data: {
        address_id: addressId
      }})
  };
}

export function loadAddress(addressId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/user/address_load', {
      params: {
        address_id: addressId
      }})
  };
}

export function addressAdd(data) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/user/address_add', {
      data: data
    })
  };
}

export function setDefault(userId, addressId) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/user/address_set_default', {
      data: {
        user_id: userId,
        address_id: addressId}
    })
  };
}

export function updateAddress(addressId, data) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/user/address_update', {
      data: {address_id: addressId, data: data}
    })
  };
}
