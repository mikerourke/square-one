/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* Internal dependencies */
import { getMuiTheme } from 'style/mui';
import { toggleAppSidebar } from 'state/gui/actions';
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
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    toggleSidebar: () => dispatch(toggleAppSidebar()),
});

/**
 * Layout container for the application.  This is used to handle navigation
 *      within the entire application.
 * @param {React.Element} children React components to display as children.
 */
const Layout = ({
    children,
    appSidebarOpen,
    toggleSidebar,
}: {
    children?: React.Element<*>,
    appSidebarOpen: boolean,
    toggleSidebar: () => void,
}): React.Element<*> => (
    <MuiThemeProvider muiTheme={getMuiTheme}>
        <div>
            <Header
                handleToggle={toggleSidebar}
            />
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
