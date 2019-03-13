import {
  SET_SIDEBAR_ACTIVE_MENU,
  SET_MAP_VIEWPORT, 
  SET_MAP_WIDTH_HEIGHT,
  SET_MAP_MINIMIZED
} from '../actions/types';

const initialState = {
  sidebar: {
    activeMenu: 'Attractions',
  },
  map: {
    token: 'pk.eyJ1IjoidG9ieWRyYW5lIiwiYSI6ImNqczY5MXptazBscWE0NGxkZDN1MWs2dHcifQ.eOPFetwg5-zZQcS9c4XlXg',
    width: '100%',
    height: '100%',
    viewport: {
      latitude: 53.002666,
      longitude: -2.179404,
      zoom: 12.5,
      bearing: 0,
      pitch: 0     
    },
    minimized: false,
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
    case SET_MAP_VIEWPORT:
      return Object.assign({}, state, {
        map: {
          ...state.map,
          viewport: action.payload
        }
      });
    case SET_MAP_WIDTH_HEIGHT:
      return Object.assign({}, state, {
        map: {
          ...state.map,
          width: action.payload.width,
          height: action.payload.height
        }
      });
    case SET_MAP_MINIMIZED:
      return Object.assign({}, state, {
        map: {
          ...state.map,
          minimized: action.payload
        }
      });
    default:
      return state;
  }
}