/* @flow */

/* External dependencies */
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

/* Internal dependencies */
import Layout from '../../layout';
import {
  Dashboard,
  LeadsListPage,
  LeadManagementPage,
  LoginPage,
} from '../../scenes';
import { toggleAppSidebar } from 'state/gui/actions';

/* Types */
import type { Store } from 'redux';

/**
 * Configures the routes for the application.
 */
const configureRoutes = (history: Object, store: Store<*>) => {
  /**
   * If the route changes, hide the Sidebar element in the layout (if
   *    visible).
   */
  history.listen(() => {
    const state = store.getState();
    const isSidebarOpen = state.getIn(['gui', 'layout', 'sidebarOpen']);
    if (isSidebarOpen) {
      store.dispatch(toggleAppSidebar());
    }
  });

  /**
   * If the user isn't authenticated, redirects them to the login page.
   * @param {Object} nextState Next state of the application.
   * @param {Function} replace Replacement route for redirect.
   */
  function requireAuth(nextState: Object, replace: Function) {
    const state = store.getState();
    const isAuthenticated = state.getIn(['session', 'isAuthenticated']);
    if (!isAuthenticated) {
      replace({
        pathName: 'login',
      });
    }
  }

  return (
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={LoginPage} />
        <Route path="login" component={LoginPage} />
        <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
        <Route path="leads" component={LeadsListPage} onEnter={requireAuth} />
        <Route path="leads/new" component={LeadManagementPage} onEnter={requireAuth} />
        <Route path="leads/:id" component={LeadManagementPage} onEnter={requireAuth} />
      </Route>
    </Router>
  );
};

export default configureRoutes;
