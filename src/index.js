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
import { getAllSettings } from 'state/settings/actions';

// Import web assets.
import './style/global.css'; // eslint-disable-line

// Configure the Axios client for API access.
const apiHost: Host = process.env.IP || 'localhost';
const apiPort: Port = process.env.API_PORT || 8082;

const client: AxiosRequestConfig = axios.create({
    baseURL: `http://${apiHost}:${apiPort}/api`,
    responseType: 'json',
});

const store = configureStore(client);

// TODO: Move settings getter to after user logs in.
store.dispatch(getAllSettings());

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
