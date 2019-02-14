import { combineReducers } from 'redux';

import authReducer from './authReducer';
import globalReducer from './globalReducer';

// Turns an object who's values are different reducing functions
// into a single reducing function used with createStore
const appReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
});

const mainReducer = (state, action) => appReducer(state, action);

export default mainReducer;