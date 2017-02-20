const LOAD = 'client/auth/LOAD';
const LOAD_SUCCESS = 'client/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'client/auth/LOAD_FAIL';
const LOGIN = 'client/auth/LOGIN';
const LOGIN_SUCCESS = 'client/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'client/auth/LOGIN_FAIL';
const LOGOUT = 'client/auth/LOGOUT';

const UPDATE = 'client/auth/UPDATE';
const UPDATE_SUCCESS = 'client/auth/UPDATE_SUCCESS';
const UPDATE_FAIL = 'client/auth/UPDATE_FAIL';

const PASSWORD_CHECK = 'client/auth/PASSWORD_CHECK';
const PASSWORD_CHECK_FAIL = 'client/auth/PASSWORD_CHECK_FAIL';
const PASSWORD_CHECK_SUCCESS = 'client/auth/PASSWORD_CHECK_SUCCESS';

const initialState = {
  loaded: false
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
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        preloader: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        preloader: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        preloader: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        preloader: false,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true,
        user: null
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
        loaded: true
      };
    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case PASSWORD_CHECK:
      return {
        ...state,
      };
    case PASSWORD_CHECK_FAIL:
      return {
        ...state,
      };
    case PASSWORD_CHECK_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load(token) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth', {
      params: {token: token}
    })
  };
}

export function login(name, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/user/login', {
      data: {
        name: name,
        password: password
      }
    })
  };
}

export function checkPassword(name, password) {
  return {
    types: [PASSWORD_CHECK, PASSWORD_CHECK_SUCCESS, PASSWORD_CHECK_FAIL],
    promise: (client) => client.post('/user/checkPassword', {
      data: {
        name: name,
        password: password
      }
    })
  };
}

export function logout() {
  return {type: LOGOUT};
}


export function checkUser(username, hash) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/user/checkUser', {
      params: {
        name: username,
        hash: hash
      }
    })
  };
}

export function checkHash(hash) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/user/checkHash', {
      params: {
        hash: hash,
      }
    })
  };
}

export function checkEmail(email) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/user/checkLogin', {
      params: {
        email: email,
      }
    })
  };
}

export function update(userId, data) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.post('/user/update', {
      data: {
        userId: userId,
        data: data
      }
    })
  };
}

export function updateUser(userId, data) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.post('/user/updateUser', {
      data: {
        userId: userId,
        data: data
      }
    })
  };
}
