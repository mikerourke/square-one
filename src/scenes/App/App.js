import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../theme';
import { actions as guiActions } from 'data/gui';
import { User } from 'data/user';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const AppContainer = styled.div`
    margin: 0 8px;
`;

export class App extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        children: PropTypes.object.isRequired,
        gui: PropTypes.object.isRequired,
        user: ImmutablePropTypes.record,
    };

    static defaultProps = {
        user: new User(),
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
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header
                        handleToggle={this.handleToggle}
                    />
                    <Sidebar
                        open={gui.appSidebarOpen}
                        handleTouchTap={this.handleSidebarTouchTap}
                        handleToggle={this.handleToggle}
                    />
                    <AppContainer>
                        {children}
                    </AppContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
