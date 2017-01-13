import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { auth } from 'data/user/actions';
import { getAllLeads } from 'data/leads/actions';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import { globalStyles } from '../styles';


class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const username = this.refs.username.getValue();
        const password = this.refs.password.getValue();
        this.props.auth(username, password);
        this.props.getAllLeads().then(() => {
            this.context.router.push('/leads');
        });
    }

    render() {
        return (
            <div style={globalStyles.formContainer}>
                <Paper style={globalStyles.paper}>
                    <form className="login"
                          onSubmit={this.handleSubmit}>
                        <TextField
                            ref="username"
                            floatingLabelText="Login"
                        />
                        <br/>
                        <TextField
                            ref="password"
                            floatingLabelText="Password"
                            type="password"
                        />
                        <br/>
                        <FlatButton
                            style={globalStyles.flatButton}
                            label="Login"
                            onClick={this.handleSubmit}
                            onTouchTap={this.handleSubmit}
                        />
                    </form>
                </Paper>
            </div>
        );
    }
}

LoginPage.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
};

LoginPage.contextTypes = {
    router: PropTypes.object
};

const mapStateToProps = (state) => ({
    leads: state.leads,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => {
    const actions = {auth, getAllLeads};
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
