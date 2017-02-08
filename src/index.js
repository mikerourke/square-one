import 'babel-polyfill';
import config from 'config';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';
import configureStore from './store/configureStore';
import routes from './routes';
import { getAllSettings } from './data/settings/actions';
import './www/styles.css';

const client = axios.create({
    baseURL: `http://${config.host}:${config.api.port}/api`,
    responseType: 'json',
});

const store = configureStore(client);
store.dispatch(getAllSettings());

// Required by Material UI library for mobile tap actions:
injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app'),
);

if (module.hot) {
    module.hot.accept();
}
