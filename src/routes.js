import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './scenes/App';
import Login from './scenes/Login';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
    </Route>
);