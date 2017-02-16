/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*
 * Internal dependencies
 */
import { getMuiTheme } from 'style/mui';
import { actions as guiActions } from 'state/gui';
import Header from './header';
import Sidebar from './sidebar';

/**
 * Styled container for the application elements.
 * @type {StyledComponent}
 */
const ChildrenContainer = styled.div`
    position: relative;
    top: 64px;
`;

/**
 * Layout container for the application.  This is used to handle navigation
 *      within the entire application.
 */
export class Layout extends Component {
    /**
     * @type {Object}
     * @property {Object} actions Redux actions bound to dispatch.
     * @property {Node} children Child nodes in layout.
     * @property {Object} gui Redux state associated with GUI.
     */
    static propTypes = {
        actions: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
        gui: PropTypes.object.isRequired,
    };

    /**
     * @param {Object} props Props passed from parent component.
     * @param {Object} context Context for the component.
     */
    constructor(props, context) {
        super(props, context);
        this.handleToggle = this.handleToggle.bind(this);
    }

    /**
     * Toggle the visibility of the sidebar.
     */
    handleToggle() {
        const { toggleAppSidebar } = this.props.actions;
        toggleAppSidebar();
    }

    /**
     * @returns {ReactElement} JSX for the component.
     */
    render() {
        const { gui, children } = this.props;

        return (
            <MuiThemeProvider muiTheme={getMuiTheme}>
                <div>
                    <Header
                        handleToggle={this.handleToggle}
                    />
                    <Sidebar
                        open={gui.appSidebarOpen}
                        handleToggle={this.handleToggle}
                    />
                    <ChildrenContainer>
                        {children}
                    </ChildrenContainer>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    gui: state.gui,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(guiActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
