const TOGGLE = 'client/sidebar/TOGGLE';

const initialState = {
  isOpen: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
}

export function toggleSidebar() {
  return {type: TOGGLE};
}
