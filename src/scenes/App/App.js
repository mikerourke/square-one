import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { User } from 'data/user';
import { muiTheme } from '../styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const styles = {
    body: {
        margin: '8px',
    },
};

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
                    <div style={styles.body}>
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
