import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from 'state/user';
import Container from './components/Container';
import ForgotPasswordButton from './components/ForgotPasswordButton';
import Header from './components/Header';
import LoginButton from './components/LoginButton';
import Logo from 'components/logo';
import Paper from 'material-ui/Paper';
import TextInput from './components/TextInput';
import { inline } from 'style/mui';

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
        const { push } = this.context.router;
        push('/leads');
    }

    render() {
        return (
            <Container>
                <Paper
                    style={{
                        ...inline.paper,
                        marginTop: 56,
                        padding: 32,
                        width: 350,
                    }}
                >
                    <Header>
                        <Logo
                            width={64}
                            height={64}
                        />
                    </Header>
                    <form onSubmit={this.handleSubmit}>
                        <TextInput
                            floatingLabelText="Login"
                        />
                        <TextInput
                            floatingLabelText="Password"
                            type="password"
                        />
                        <LoginButton
                            label="Login"
                            primary={true}
                            type="submit"
                        />
                        <ForgotPasswordButton
                            label="Forgot Password?"
                        />
                    </form>
                </Paper>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
