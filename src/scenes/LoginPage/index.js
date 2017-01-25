import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { auth } from 'data/user/actions';
import { getAllLeads } from 'data/leads/actions';
import { globalStyles } from '../styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';


export class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.getAllLeads().then(() => {
            this.context.router.push('/leads');
        });
    }

    render() {
        return (
            <div style={globalStyles.formContainer}>
                <Paper style={globalStyles.paper}>
                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <TextField
                            floatingLabelText="Login"
                        />
                        <br />
                        <TextField
                            floatingLabelText="Password"
                            type="password"
                        />
                        <br />
                        <FlatButton
                            style={globalStyles.flatButton}
                            label="Login"
                            type="submit"
                        />
                    </form>
                </Paper>
            </div>
        );
    }
}

LoginPage.propTypes = {
    actions: PropTypes.object,
};

LoginPage.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = state => ({
    leads: state.leads,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ auth, getAllLeads }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
