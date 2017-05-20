/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* Internal dependencies */
import { getMuiTheme } from 'style/mui';
import { toggleAppSidebar } from 'state/gui/actions';
import Session from 'state/session/model';
import Header from './header';
import PromptDialog from './prompt-dialog';
import Sidebar from './sidebar';

/* Types */
import type { Map } from 'immutable';

const mapStateToProps = state => ({
  appLayout: state.getIn(['gui', 'layout']),
  session: state.get('session'),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  toggleSidebar: () => dispatch(toggleAppSidebar()),
});

/**
 * Layout container for the application.  This is used to handle navigation
 *    within the entire application.
 * @param {Node} children Child components in layout.
 * @param {Map} appLayout Map representing the application layout in Redux
 *    state.
 * @param {Session} session Session properties from Redux state.
 * @param {Function} toggleSidebar Dispatched action that toggles the Sidebar
 *    Menu.
 * @constructor
 */
const Layout = ({
  children,
  appLayout,
  session,
  toggleSidebar,
}: {
  children: React.Element<*>,
  appLayout: Map<string, any>,
  session: Session,
  toggleSidebar: () => Promise<*>,
}): React.Element<*> => (
  <MuiThemeProvider muiTheme={getMuiTheme}>
    <div>
      {session.isAuthenticated &&
       (<Header handleToggle={toggleSidebar} />)
      }
      <Sidebar
        open={appLayout.get('sidebarOpen')}
        handleToggle={toggleSidebar}
      />
      <glamorous.Div
        position="relative"
        top={64}
      >
        {children}
      </glamorous.Div>
      <PromptDialog />
    </div>
  </MuiThemeProvider>
);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
