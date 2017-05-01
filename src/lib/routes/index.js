/* @flow */

/* External dependencies */
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

/* Internal dependencies */
import Layout from '../../layout';
import {
    Dashboard,
    LeadsListPage,
    LoginPage,
    ManageLeadPage,
} from '../../scenes';
import Auth from 'components/authentication';
import { toggleAppSidebar } from 'state/gui/actions';

/* Types */
import type { Store } from 'redux';

/**
 * Configures the routes for the application.
 */
const configureRoutes = (history: Object, store: Store<*>) => {
    /**
     * If the route changes, hide the Sidebar element in the layout (if
     *      visible).
     */
    history.listen((location) => {
        const state = store.getState();
        const isAppSidebarOpen = state.getIn(['gui', 'appSidebarOpen']);
        if (isAppSidebarOpen) {
            store.dispatch(toggleAppSidebar());
        }
    });

    return (
        <Router history={history}>
            <Route path="/" component={Layout} >
                <IndexRoute component={Auth(LeadsListPage)} />
                <Route path="login" component={LoginPage} />
                <Route path="dashboard" component={Auth(Dashboard)} />
                <Route path="leads" component={Auth(LeadsListPage)} />
                <Route path="leads/new" component={Auth(ManageLeadPage)} />
                <Route path="leads/:id" component={Auth(ManageLeadPage)} />
            </Route>
        </Router>
    );
};

export default configureRoutes;
