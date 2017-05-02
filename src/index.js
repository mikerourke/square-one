/* @flow */

/**
 * Entry point for the application.  The assets associated with the client
 *      bundle are located in the "www" folder.
 */
import 'babel-polyfill';

/* External dependencies */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import axios, { AxiosRequestConfig } from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';

/* Internal dependencies */
import configureStore from './state';
import renderRoutes from './lib/routes';

// Import web assets.
import './style/global.css'; // eslint-disable-line

// Configure Axios client for Redux actions.
const client: AxiosRequestConfig = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:8080/api',
    headers: { Authorization: localStorage.getItem('jwt') },
    responseType: 'json',
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
