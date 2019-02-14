import { SET_CURRENT_USER } from './types';

// Sets a new user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Clears the current user
// basically logout
export const clearCurrentUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');

  // Set current user to {} which clears it
  dispatch(setCurrentUser({}));
};