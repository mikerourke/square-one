import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { muiTheme } from '../styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const styles = {
    body: {
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
        this.setState({
            open: !this.state.open,
        });
    }

    render() {
        const { children } = this.props;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header handleToggle={this.handleToggle} />
                    <Sidebar
                        open={this.state.open}
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

App.propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
};

App.defaultProps = {
    user: {},
};

App.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(App);
