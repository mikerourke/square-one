/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/* Internal dependencies */
import { getAllSettings } from 'state/settings/actions';
import { getAllUsers } from 'state/entities/users/actions';
import { login } from 'state/session/actions';
import Session from 'state/session/model';
import Logo from 'components/logo';

/* Types */
type DefaultProps = {
    getAllSettings: () => Promise<*>,
    getAllUsers: () => Promise<*>,
    login: (username: string, password: string) => Promise<*>,
};

type Props = {
    getAllSettings: () => Promise<*>,
    getAllUsers: () => Promise<*>,
    login: (username: string, password: string) => Promise<*>,
    session: Session,
};

type State = {
    username: string,
    password: string,
    usernameErrorText: string,
    passwordErrorText: string,
};

/**
 * Styled container for page content.
 */
const PageContainer = styled.div`
    display: flex;
    flex-flow: none;
    justify-content: center;
`;

/**
 * Styled container for header content.
 */
const HeaderContainer = styled.div`
    text-align: center;
`;

const mapStateToProps = state => ({
    session: state.get('session'),
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    getAllSettings: () => dispatch(getAllSettings()),
    getAllUsers: () => dispatch(getAllUsers()),
    login: (username, password) => dispatch(login(username, password)),
});

/**
 * Login page for accessing the application.
 */
export class LoginPage extends Component<DefaultProps, Props, State> {
    props: Props;
    state: State;

    static defaultProps = {
        getAllSettings: () => Promise.resolve(),
        getAllUsers: () => Promise.resolve(),
        login: () => Promise.resolve(),
    };

    constructor(): void {
        super();
        this.state = {
            username: '',
            password: '',
            usernameErrorText: '',
            passwordErrorText: '',
        };
    }

    handleInputChange = (event: Event & { currentTarget: HTMLInputElement },
        newValue: string): void => {
        const fieldName = event.currentTarget.name;
        const errorTextFieldName = `${fieldName}ErrorText`;
        this.setState({
            [fieldName]: newValue,
            [errorTextFieldName]: '',
        });
    };

    handleKeyPress = (event: Event & {
        currentTarget: HTMLInputElement | HTMLButtonElement }): void => {
        const controlName = event.currentTarget.name;
        const { key } = (event: Object);
        if (key === 'Enter') {
            if (controlName === 'password' || controlName === 'login') {
                this.handleLoginButtonTouchTap(event);
            }
        }
    };

    validateEntries = (): boolean => {
        const { username, password } = this.state;
        let usernameErrorText = '';
        let passwordErrorText = '';
        let isValid = true;
        if (username === '') {
            usernameErrorText = 'Username is required';
            isValid = false;
        }
        if (password === '') {
            passwordErrorText = 'Password is required';
            isValid = false;
        }
        this.setState({
            usernameErrorText,
            passwordErrorText,
        });
        return isValid;
    };

    handleLoginButtonTouchTap = (event: Event): void => {
        event.preventDefault();
        const entriesValid = this.validateEntries();
        if (entriesValid) {
            const { username, password } = this.state;
            const getAllSettingsFn: Function = this.props.getAllSettings;
            const getAllUsersFn: Function = this.props.getAllUsers;
            const loginFn: Function = this.props.login;
            loginFn(username, password).then(() => {
                const currentSession = this.props.session;
                if (currentSession.error) {
                    this.setState({ passwordErrorText: 'Incorrect password' });
                } else {
                    getAllSettingsFn()
                        .then(getAllUsersFn)
                        .then(() => browserHistory.push('/leads'));
                }
            });
        }
    };

    render(): React.Element<*> {
        const { usernameErrorText, passwordErrorText } = this.state;

        return (
            <PageContainer>
                <Paper
                    style={{
                        display: 'block',
                        marginTop: 56,
                        maxWidth: 1200,
                        padding: 32,
                        width: 350,
                    }}
                >
                    <HeaderContainer>
                        <Logo
                            height={64}
                            width={64}
                        />
                    </HeaderContainer>
                    <form>
                        <TextField
                            errorText={usernameErrorText}
                            floatingLabelText="Login"
                            fullWidth={true}
                            onKeyPress={this.handleKeyPress}
                            name="username"
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            errorText={passwordErrorText}
                            floatingLabelText="Password"
                            fullWidth={true}
                            onKeyPress={this.handleKeyPress}
                            name="password"
                            onChange={this.handleInputChange}
                            type="password"
                        />
                        <RaisedButton
                            fullWidth={true}
                            label="Login"
                            name="login"
                            onKeyPress={this.handleKeyPress}
                            onTouchTap={this.handleLoginButtonTouchTap}
                            primary={true}
                            style={{ marginTop: 24 }}
                        />
                        <FlatButton
                            label="Forgot Password?"
                            name="forgot-password"
                            style={{
                                marginTop: 24,
                                width: '100%',
                            }}
                        />
                    </form>
                </Paper>
            </PageContainer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
