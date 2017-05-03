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
import Sidebar from './sidebar';

const mapStateToProps = state => ({
    appSidebarOpen: state.getIn(['gui', 'appSidebarOpen']),
    session: state.get('session'),
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    toggleSidebar: () => dispatch(toggleAppSidebar()),
});

/**
 * Layout container for the application.  This is used to handle navigation
 *      within the entire application.
 */
const Layout = ({
    children,
    appSidebarOpen,
    session,
    toggleSidebar,
}: {
    children: React.Element<*>,
    appSidebarOpen: boolean,
    session: Session,
    toggleSidebar: () => Promise<*>,
}): React.Element<*> => (
    <MuiThemeProvider muiTheme={getMuiTheme}>
        <div>
            {session.isAuthenticated &&
                (<Header handleToggle={toggleSidebar} />)
            }
            <Sidebar
                open={appSidebarOpen}
                handleToggle={toggleSidebar}
            />
            <glamorous.Div
                position="relative"
                top={64}
            >
                {children}
            </glamorous.Div>
        </div>
    </MuiThemeProvider>
);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
