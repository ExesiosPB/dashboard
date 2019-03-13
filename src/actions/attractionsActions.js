import {
  SET_VENUES,
  SET_VENUES_SELECTED
} from './types';

export const setAttractionsVenues = (category, venues) => {
  return {
    type: SET_VENUES,
    category,
    payload: venues,
  }
};

export const setAttractionsVenuesSelected = (category, selected) => {
  return {
    type: SET_VENUES_SELECTED,
    category,
    payload: selected,
  }
};