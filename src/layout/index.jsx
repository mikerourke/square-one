// @flow
/* External dependencies */
import React, { Component, PropTypes } from 'react';
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

/**
 * Layout container for the application.  This is used to handle navigation
 *      within the entire application.
 */
const Layout = ({
    children,
    gui,
    toggleSidebar,
}: {
    children?: React.Element<*>,
    gui: Object,
    toggleSidebar: () => void,
}): React.Element<*> => (
    <MuiThemeProvider muiTheme={getMuiTheme}>
        <div>
            <Header
                handleToggle={toggleSidebar}
            />
            <Sidebar
                open={gui.appSidebarOpen}
                handleToggle={toggleSidebar}
            />
            <ChildrenContainer>
                {children}
            </ChildrenContainer>
        </div>
    </MuiThemeProvider>
);

const mapStateToProps = state => ({
    gui: state.gui,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    toggleSidebar: () => dispatch(toggleAppSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
