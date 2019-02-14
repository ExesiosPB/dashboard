import { SET_SIDEBAR_ACTIVE_MENU } from '../actions/types';

const initialState = {
  sidebar: {
    activeMenu: 'Attractions',
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDEBAR_ACTIVE_MENU:
      return Object.assign({}, state, {
        sidebar: {
          ...state.sidebar,
          activeMenu: action.payload
        }
      });
    default:
      return state;
  }
}