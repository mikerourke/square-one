import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from 'data/user';
import { actions as leadActions } from 'data/leads';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import styles from 'scenes/styles';


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
            <div style={styles.formContainer}>
                <Paper style={styles.paper}>
                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <div>
                            <TextField
                                floatingLabelText="Login"
                            />
                        </div>
                        <div>
                            <TextField
                                floatingLabelText="Password"
                                type="password"
                            />
                        </div>
                        <div>
                            <RaisedButton
                                label="Login"
                                type="submit"
                                style={styles.button}
                            />
                        </div>
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
