// Handle URL's
let ACCOUNTS_URL;
let LIBM_URL;
let LIBM_OTHER_URL;

// if (process.env.NODE_ENV === 'production') {
  ACCOUNTS_URL = process.env.REACT_APP_ACCOUNTS_URL_PROD;
//   LIBM_URL = process.env.REACT_APP_LIBM_URL_PROD;
//   LIBM_OTHER_URL = process.env.REACT_APP_LIBM_URL2_PROD;
// } else {
  // ACCOUNTS_URL = process.env.REACT_APP_ACCOUNTS_URL_DEV;
  LIBM_URL = process.env.REACT_APP_LIBM_URL_DEV;
  LIBM_OTHER_URL = process.env.REACT_APP_LIBM_URL2_DEV2;
// }

const isEmpty = value => value === undefined || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0);

const HERE_BASE_URL = 'https://places.demo.api.here.com';

module.exports = {
  isEmpty,
  ACCOUNTS_URL,
  LIBM_URL,
  HERE_BASE_URL,
  LIBM_OTHER_URL
};
