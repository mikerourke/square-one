import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from 'data/user';
import { actions as leadActions } from 'data/leads';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Logo from 'components/Logo';
import globalStyles from 'scenes/styles';

const styles = Object.assign({}, globalStyles, {
    formContainer: Object.assign({}, globalStyles.formContainer, {
        flexFlow: 'none',
    }),
    formHeader: {
        container: {
            display: 'flex',
            alignItems: 'center',
        },
        text: {
            fontSize: '24px',
            paddingLeft: globalStyles.spacing.gutterLess,
        },
    },
    paper: Object.assign({}, globalStyles.paper, {
        marginTop: globalStyles.spacing.gutterMore,
        padding: globalStyles.spacing.gutterMore,
        width: '350px',
    }),
    textField: {
        width: '100%',
    },
});

export class LoginPage extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
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
                    <form onSubmit={this.handleSubmit}>
                        <div style={styles.formHeader.container}>
                            <Logo
                                width="24px"
                                height="24px"
                            />
                            <span style={styles.formHeader.text}>
                                SQUARE1
                            </span>
                        </div>
                        <TextField
                            style={styles.textField}
                            floatingLabelText="Login"
                        />
                        <TextField
                            style={styles.textField}
                            floatingLabelText="Password"
                            type="password"
                        />
                        <RaisedButton
                            label="Login"
                            type="submit"
                            style={styles.button}
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
