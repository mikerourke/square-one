/* @flow */

/**
 * Entry point for the application.  The assets associated with the client
 *    bundle are located in the "www" folder.
 */
import 'babel-polyfill';

/* External dependencies */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';

/* Internal dependencies */
import configureStore from './state';
import renderRoutes from './lib/routes';

// Import web assets.
import './style/global.css'; // eslint-disable-line

// Setup default Axios instance.
axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/api';
axios.defaults.responseType = 'json';

const client = axios.create({
  headers: { Authorization: localStorage.getItem('jwt') },
});
const store = configureStore(client);

// This is required by Material UI library for mobile tap actions.
injectTapEventPlugin();

render(
  <Provider store={store}>
    {renderRoutes(browserHistory, store)}
  </Provider>,
  document.getElementById('app'),
);

// This is for development purposes.  It is used for hot module reloading.
if (module.hot) {
  module.hot.accept();
}
