import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userActions } from 'data/user';
import { leadActions } from 'data/leads';
import { globalStyles } from '../styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';


export class LoginPage extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object,
    };

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

const mapStateToProps = state => ({
    leads: state.leads,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => {
    const combinedActions = Object.assign({}, userActions, leadActions);
    return {
        actions: bindActionCreators(combinedActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
