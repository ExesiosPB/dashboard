import { combineReducers } from 'redux';

import authReducer from './authReducer';
import globalReducer from './globalReducer';
import attractionsReducer from './attractionsReducer';

// Turns an object who's values are different reducing functions
// into a single reducing function used with createStore
const appReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  attractions: attractionsReducer,
});

const mainReducer = (state, action) => appReducer(state, action);

export default mainReducer;