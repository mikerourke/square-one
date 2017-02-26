/* @flow */

/* External dependencies */
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import type { Store } from 'redux';

/* Internal dependencies */
import Layout from '../../layout';
import { LoginPage, LeadsListPage, ManageLeadPage } from '../../containers';
import { toggleAppSidebar } from 'state/gui/actions';

/**
 * Configures the routes for the application.
 */
const configureRoutes = (history: Object, store: Store<*>) => {
    /**
     * If the route changes, hide the Sidebar element in the layout (if
     *      visible).
     */
    history.listen((location) => {
        if (store.getState().gui.appSidebarOpen) {
            store.dispatch(toggleAppSidebar());
        }
    });

    return (
        <Router history={history}>
            <Route path="/" component={Layout} >
                <IndexRoute component={LoginPage} />
                <Route path="login" component={LoginPage} />
                <Route path="leads" component={LeadsListPage} />
                <Route path="leads/new" component={ManageLeadPage} />
                <Route path="leads/:id" component={ManageLeadPage} />
            </Route>
        </Router>
    );
};

export default configureRoutes;
