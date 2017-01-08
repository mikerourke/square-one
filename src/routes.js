import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './scenes/App';
import Login from './scenes/Login';
import LeadList from './scenes/LeadList';
import LeadManagement from './scenes/LeadManagement';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
        <Route path="leads" component={LeadList} />
        <Route path="lead" component={LeadManagement} />
    </Route>
);