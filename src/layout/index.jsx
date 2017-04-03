/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* Internal dependencies */
import { getMuiTheme } from 'style/mui';
import { toggleAppSidebar } from 'state/gui/actions';
import Session from 'state/session/model';
import Header from './header';
import Sidebar from './sidebar';

/**
 * Styled container for the application elements.
 */
const ChildrenContainer = styled.div`
    position: relative;
    top: 64px;
`;

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
            {(session.id !== 0) && (<Header handleToggle={toggleSidebar} />)}
            <Sidebar
                open={appSidebarOpen}
                handleToggle={toggleSidebar}
            />
            <ChildrenContainer>
                {children}
            </ChildrenContainer>
        </div>
    </MuiThemeProvider>
);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
