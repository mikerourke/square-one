import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { App, LoginPage, LeadsPage, ManageLeadPage } from './scenes';
import { toggleAppSidebar } from 'data/gui/actions';

export default (history, store) => {
    history.listen((location) => {
        if (store.getState().gui.appSidebarOpen) {
            store.dispatch(toggleAppSidebar());
        }
    });

    return (
        <Router history={history}>
            <Route path="/" component={App} >
                <IndexRoute component={LoginPage} />
                <Route path="login" component={LoginPage} />
                <Route path="leads" component={LeadsPage} />
                <Route path="leads/new" component={ManageLeadPage} />
                <Route path="leads/:id" component={ManageLeadPage} />
            </Route>
        </Router>
    );
};
