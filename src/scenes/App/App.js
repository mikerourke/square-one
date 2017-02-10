import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../theme';
import { User } from 'data/user';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export class App extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };

    static propTypes = {
        children: PropTypes.object.isRequired,
        user: ImmutablePropTypes.record,
    };

    static defaultProps = {
        user: new User(),
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleSidebarTouchTap = this.handleSidebarTouchTap.bind(this);
    }

    handleSidebarTouchTap(event) {
        // TODO: Write code to handle menu events.
    }

    handleToggle() {
        this.setState({
            open: !this.state.open,
        });
    }

    render() {
        const { children } = this.props;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header
                        handleToggle={this.handleToggle}
                    />
                    <Sidebar
                        open={this.state.open}
                        handleTouchTap={this.handleSidebarTouchTap}
                        handleToggle={this.handleToggle}
                    />
                    <div>
                        {children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(App);
