import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'data/users/actions';
import * as leadActions from 'data/leads/actions';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import { globalStyles } from '../styles';


class Login extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const username = this.refs.username.getValue();
        const password = this.refs.password.getValue();
        this.props.auth(username, password);
        this.props.getAllLeads();
        this.context.router.push('/leads');
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

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string
};

Login.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        leads: state.leads,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, userActions, leadActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
