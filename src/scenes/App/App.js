import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'data/users/actions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { ActionAccountCircle } from 'material-ui/svg-icons';

import { muiTheme } from '../styles';
import Sidebar from './components/Sidebar';

const styles = {
    icon: {
        color: 'white',
        cursor: 'pointer',
        width: '24px',
        height: '48px',
        padding: '0 8px'
    },

    body: {
        paddingLeft: '24px'
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const { user } = this.props;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                        iconElementRight={<ActionAccountCircle
                            style={styles.icon}/>}
                        onLeftIconButtonTouchTap={this.handleToggle}
                    />
                    <Sidebar open={this.state.open}
                             handleToggle={this.handleToggle}
                             iconStyle={styles.icon}
                    />
                    <div style={styles.body}>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.object
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

export default connect(mapStateToProps)(App);
