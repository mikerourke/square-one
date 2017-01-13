import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';
import configureStore from './store/configureStore';
import routes from './routes';

const client = axios.create({
    baseURL: 'http://localhost:8082',
    responseType: 'json',
});

const store = configureStore(client);

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
