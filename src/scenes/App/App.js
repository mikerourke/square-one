import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme } from '../styles';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleToggle = this.handleToggle.bind(this);
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

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(App);
