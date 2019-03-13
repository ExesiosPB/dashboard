import {
  SET_VENUES,
  SET_VENUES_SELECTED,
} from '../actions/types';

const inititalState = {
  venues: {
    'Attractions': {
      selected: false,
      venues: [],
    },
    'Services': {
      selected: true,
      venues: [],
    },
    'Food & Shopping': {
      selected: false,
      venues: [],
    },
    'Health': {
      selected: false,
      venues: [],
    }
  },
  search: {
    lat: 53.02994,
    lng: -2.17504
  }
};

export default (state = inititalState, action) => {
  const category = action.category;
  const venues = { ...state, venues: { ...state.venues }};

  switch (action.type) {
    case SET_VENUES:
      venues.venues[category] = { ...state.venues[category], venues: action.payload };
      return Object.assign({}, state, venues);
    case SET_VENUES_SELECTED:
      venues.venues[category] = { ...state.venues[category], selected: action.payload };
      return Object.assign({}, state, venues);      
    default:
      return state;
  }
}