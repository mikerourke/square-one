/* @flow */

/* External dependencies */
import React from 'react';
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
type Props = {
    getAllSettings: () => Promise<*>,
    getAllUsers: () => Promise<*>,
    login: (username: string, password: string) => Promise<*>,
    session: Session,
};

type State = {
    password: string,
    username: string,
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
export class LoginPage extends React.Component<*, Props, State> {
    props: Props;
    state: State;

    constructor(): void {
        super();
        this.state = {
            password: '',
            username: '',
        };
    }

    handleInputChange = (event: Event & { currentTarget: HTMLInputElement },
        newValue: string): void => {
        const fieldName = event.currentTarget.name;
        this.setState({ [fieldName]: newValue });
    };

    handleLoginButtonTouchTap = (event: Event): void => {
        event.preventDefault();
        const { password, username } = this.state;
        const getAllSettingsFn: Function = this.props.getAllSettings;
        const getAllUsersFn: Function = this.props.getAllUsers;
        getAllSettingsFn()
            .then(getAllUsersFn)
            .then(() => browserHistory.push('/leads'));
        // TODO: Finish writing login function.
        // const loginFn: Function = this.props.login;
        // loginFn(username, password).then(() => { });
    };

    render(): React.Element<*> {
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
                    <form onSubmit={this.handleLoginButtonTouchTap}>
                        <TextField
                            floatingLabelText="Login"
                            fullWidth={true}
                            name="username"
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            floatingLabelText="Password"
                            fullWidth={true}
                            name="password"
                            onChange={this.handleInputChange}
                            type="password"
                        />
                        <RaisedButton
                            fullWidth={true}
                            label="Login"
                            onTouchTap={this.handleLoginButtonTouchTap}
                            primary={true}
                            style={{ marginTop: 24 }}
                            type="submit"
                        />
                        <FlatButton
                            label="Forgot Password?"
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
