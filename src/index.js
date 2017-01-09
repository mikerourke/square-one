import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store/configureStore';
import ApiClient from './services/api/ApiClient';
import { Provider } from 'react-redux';
import routes from './routes';

const client = new ApiClient();
const store = configureStore(client);

injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}
