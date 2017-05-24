/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* Internal dependencies */
import { getMuiTheme } from 'style/mui';
import { toggleAppSidebar } from 'state/gui/actions';
import { selectGuiLayout } from 'state/gui/selectors';
import Session from 'state/session/model';
import GlobalDialog from './global-dialog';
import GlobalSnackbar from './global-snackbar';
import Header from './header';
import Sidebar from './sidebar';

/* Types */
import type { Map } from 'immutable';

const mapStateToProps = state => ({
  guiLayout: selectGuiLayout(state),
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
 * @param {Map} guiLayout Map representing the application layout in Redux
 *    state.
 * @param {Session} session Session properties from Redux state.
 * @param {Function} toggleSidebar Dispatched action that toggles the Sidebar
 *    Menu.
 * @constructor
 */
const Layout = ({
  children,
  guiLayout,
  session,
  toggleSidebar,
}: {
  children: React.Element<*>,
  guiLayout: Map<string, any>,
  session: Session,
  toggleSidebar: () => void,
}): React.Element<*> => (
  <MuiThemeProvider muiTheme={getMuiTheme}>
    <div>
      {session.isAuthenticated &&
       (<Header handleToggle={toggleSidebar} />)
      }
      <Sidebar
        open={guiLayout.get('sidebarOpen')}
        handleToggle={toggleSidebar}
        fullNameOfUser={session.get('fullName')}
      />
      <glamorous.Div
        position="relative"
        top={64}
      >
        {children}
      </glamorous.Div>
      <GlobalDialog />
      <GlobalSnackbar />
    </div>
  </MuiThemeProvider>
);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
