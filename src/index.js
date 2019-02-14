import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import jwtDecode from 'jwt-decode';

// Styles
import 'bootstrap/dist/css/bootstrap.css'

// App imports
import mainReducer from './reducers/index';
import { setCurrentUser, clearCurrentUser } from './actions/authActions';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';

const ACCOUNTS_URL = process.env.REACT_APP_ACCOUNTS_URL;

const store = createStore(
  mainReducer,
  // Redux thunk allows you to make action creators that return a function
  // instead of an action
  applyMiddleware(thunk, promise, createLogger()),
);

// Check for jwt token
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;

  // Decode token to get user email and expiary
  // then update store
  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Token has expired so logout user
    store.dispatch(clearCurrentUser());
    // Now logout of accounts server
    window.location.href = `${ACCOUNTS_URL}/logout`;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Route exact path='/' component={Home} />
        <Route path='/auth/:token' component={Auth} />
      </React.Fragment>
    </BrowserRouter> 
  </Provider>,
  document.getElementById('root'),
);