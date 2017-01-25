import 'babel-polyfill';
import config from 'config';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Axios from 'axios';
import configureStore from './store/configureStore';
import routes from './routes';
import { getAllSettings } from './data/settings/actions';

const client = Axios.create({
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
