const LOAD = 'client/card/LOAD';
const LOAD_SUCCESS = 'client/card/LOAD_SUCCESS';
const LOAD_FAIL = 'client/card/LOAD_FAIL';

const LOAD_LIST = 'client/card/LOAD_LIST';
const LOAD_LIST_SUCCESS = 'client/card/LOAD_LIST_SUCCESS';
const LOAD_LIST_FAIL = 'client/card/LOAD_LIST_FAIL';

const LOAD_CARD = 'client/card/LOAD_LIST';
const LOAD_CARD_SUCCESS = 'client/card/LOAD_CARD_SUCCESS';
const LOAD_CARD_FAIL = 'client/card/LOAD_CARD_FAIL';

const REMOVE = 'client/card/REMOVE';
const REMOVE_SUCCESS = 'client/card/REMOVE_SUCCESS';
const REMOVE_FAIL = 'client/card/REMOVE_FAIL';

const SAVE = 'client/card/SAVE';
const SAVE_SUCCESS = 'client/card/SAVE_SUCCESS';
const SAVE_FAIL = 'client/card/SAVE_FAIL';

const UPDATE_CARD = 'client/card/UPDATE_LIST';
const UPDATE_CARD_FAIL = 'client/card/UPDATE_CARD_FAIL';
const UPDATE_CARD_SUCCESS = 'client/card/UPDATE_CARD_SUCCESS';

const initialState = {
  loaded: false,
  item: {},
  items: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case UPDATE_CARD:
      return {
        ...state,
        loading: true
      };
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.result
      };
    case UPDATE_CARD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_LIST:
      return {
        ...state,
        loading: true
      };
    case LOAD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.result
      };
    case LOAD_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_CARD:
      return {
        ...state,
        loading: true
      };
    case LOAD_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        card: action.result
      };
    case LOAD_CARD_FAIL:
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
        loaded: true
      };
    case SAVE_FAIL:
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
        loaded: true
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

export function cardList(userId) {
  return {
    types: [LOAD_LIST, LOAD_LIST_SUCCESS, LOAD_LIST_FAIL],
    promise: (client) => client.get('/card/list', {
      params: {user_id: userId}
    })
  };
}

export function updateCard(cardId, userId) {
  return {
    types: [UPDATE_CARD, UPDATE_CARD_SUCCESS, UPDATE_CARD_FAIL],
    promise: (client) => client.post('/card/updateCard', {
      data: {
        card_id: cardId,
        user_id: userId,
      }
    })
  };
}

export function cardRemove(cardId) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.post('/card/remove', {
      data: {card_id: cardId}
    })
  };
}

export function cardLoad(cardId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/card/load', {
      params: {card_id: cardId}
    })
  };
}

export function cardSetDefault(userId, cardId) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/card/set_default', {
      data: {
        user_id: userId,
        card_id: cardId
      }
    })
  };
}

export function cardSave(userId, isDefault, data) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/card/save', {
      data: {
        user_id: userId,
        is_default: isDefault,
        data: data
      }
    })
  };
}

export function cardType(userId) {
  return {
    types: [LOAD_CARD, LOAD_CARD_SUCCESS, LOAD_CARD_FAIL],
    promise: (client) => client.get('/card/cardType', {
      params: {user_id: userId}
    })
  };
}
