import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { muiTheme } from '../styles';
import { User } from 'data/user';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const style = {
    body: {
        paddingLeft: '24px',
    },
};

export class App extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired,
        user: ImmutablePropTypes.record,
    };

    static defaultProps = {
        user: new User(),
    };

    static contextTypes = {
        router: PropTypes.object,
    };

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
                    <div style={style.body}>
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
