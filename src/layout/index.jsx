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
import { actions as guiActions } from 'modules/gui';
import Header from './header';
import Sidebar from './sidebar';

const ChildrenContainer = styled.div`
    position: relative;
    top: 64px;
`;

export class Layout extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        children: PropTypes.object.isRequired,
        gui: PropTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this.handleToggle = this.handleToggle.bind(this);
        this.handleSidebarTouchTap = this.handleSidebarTouchTap.bind(this);
    }

    handleSidebarTouchTap(event) {
        // TODO: Write code to handle menu events.
    }

    handleToggle() {
        const { toggleAppSidebar } = this.props.actions;
        toggleAppSidebar();
    }

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
                        handleTouchTap={this.handleSidebarTouchTap}
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
