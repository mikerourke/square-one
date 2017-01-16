import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { muiTheme } from '../styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const styles = {
    icon: {
        color: 'white',
        cursor: 'pointer',
        width: '24px',
        height: '48px',
        padding: '0 8px',
    },
    body : {
        paddingLeft: '24px',
    },
};

export class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        const isLogged = false;
        if (isLogged) {
            this.setState({
                open: !this.state.open,
            });
        }
    }

    render() {
        const { children } = this.props;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header handleToggle={this.handleToggle}
                            iconStyle={styles.icon} />
                    <Sidebar open={this.state.open}
                             handleToggle={this.handleToggle}
                             iconStyle={styles.icon}
                    />
                    <div style={styles.body}>
                        {children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.object
};

App.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(App);
