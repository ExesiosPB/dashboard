// Handle URL's
let ACCOUNTS_URL;
let LIBM_URL;

if (process.env.NODE_ENV === 'production') {
  ACCOUNTS_URL = process.env.REACT_APP_ACCOUNTS_URL_PROD;
  LIBM_URL = process.env.REACT_APP_LIBM_URL_PROD;
} else {
  ACCOUNTS_URL = process.env.REACT_APP_ACCOUNTS_URL_DEV;
  LIBM_URL = process.env.REACT_APP_LIBM_URL_DEV;
}

const isEmpty = value => value === undefined || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0);

const HERE_BASE_URL = 'https://places.demo.api.here.com';

module.exports = {
  isEmpty,
  ACCOUNTS_URL,
  LIBM_URL,
  HERE_BASE_URL
};