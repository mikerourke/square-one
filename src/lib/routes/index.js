/*
 * External dependencies
 */
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

/*
 * Internal dependencies
 */
import Layout from '../../layout';
import { LoginPage, LeadsPage, ManageLeadPage } from '../../containers';
import { toggleAppSidebar } from 'state/gui/actions';

/**
 * Configures the routes for the application.
 * @param {Object} history Browser history from React Router.
 * @param {Object} store Redux store.
 * @returns {Router} Router specification for the application.
 */
const configureRoutes = (history, store) => {
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
                <Route path="leads" component={LeadsPage} />
                <Route path="leads/new" component={ManageLeadPage} />
                <Route path="leads/:id" component={ManageLeadPage} />
            </Route>
        </Router>
    );
};

export default configureRoutes;