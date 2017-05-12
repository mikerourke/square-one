/* @flow */

// TODO: Update formatting of global dialog.

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* Internal dependencies */
import { getMuiTheme } from 'style/mui';
import { toggleAppSidebar, togglePromptDialog } from 'state/gui/actions';
import Session from 'state/session/model';
import Header from './header';
import Sidebar from './sidebar';

/* Types */
import type { Map } from 'immutable';

const mapStateToProps = state => ({
  appLayout: state.getIn(['gui', 'layout']),
  promptDialog: state.getIn(['gui', 'promptDialog']),
  session: state.get('session'),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  toggleSidebar: () => dispatch(toggleAppSidebar()),
  togglePrompt: (title, message) =>
    dispatch(togglePromptDialog(title, message)),
});

/**
 * Layout container for the application.  This is used to handle navigation
 *    within the entire application.
 */
const Layout = ({
  children,
  appLayout,
  promptDialog,
  session,
  toggleSidebar,
  togglePrompt,
}: {
  children: React.Element<*>,
  appLayout: Map<string, any>,
  promptDialog: Map<string, any>,
  session: Session,
  toggleSidebar: () => Promise<*>,
  togglePrompt: (title: string, message: string) => void,
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
      <Dialog
        actions={[
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={() => togglePrompt('', '')}
          />,
        ]}
        title={promptDialog.get('title')}
        modal={true}
        open={promptDialog.get('open')}
      >
        {promptDialog.get('message')}
      </Dialog>
    </div>
  </MuiThemeProvider>
);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
