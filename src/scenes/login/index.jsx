/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import glamorous from 'glamorous';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/* Internal dependencies */
import { getAllLeads } from 'state/entities/leads/actions';
import { getAllSettings } from 'state/settings/actions';
import { getAllUsers } from 'state/entities/users/actions';
import { login } from 'state/session/actions';
import Session from 'state/session/model';
import Logo from 'components/logo';
import ProgressIndicator from 'components/progress-indicator';

/* Types */
type DefaultProps = {
  getAllLeads: () => Promise<*>,
  getAllSettings: () => Promise<*>,
  getAllUsers: () => Promise<*>,
  login: (username: string, password: string) => Promise<*>,
};

type Props = {
  getAllLeads: () => Promise<*>,
  getAllSettings: () => Promise<*>,
  getAllUsers: () => Promise<*>,
  login: (username: string, password: string) => Promise<*>,
  session: Session,
};

type State = {
  isLoading: boolean,
  username: string,
  password: string,
  usernameErrorText: string,
  passwordErrorText: string,
};

const mapStateToProps = state => ({
  session: state.get('session'),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getAllLeads: () => dispatch(getAllLeads()),
  getAllSettings: () => dispatch(getAllSettings()),
  getAllUsers: () => dispatch(getAllUsers()),
  login: (username, password) => dispatch(login(username, password)),
});

/**
 * Login page for accessing the application.
 * @export
 * @class LoginPage
 */
export class LoginPage extends Component<DefaultProps, Props, State> {
  props: Props;
  state: State;

  static defaultProps = {
    getAllLeads: () => Promise.resolve(),
    getAllSettings: () => Promise.resolve(),
    getAllUsers: () => Promise.resolve(),
    login: () => Promise.resolve(),
  };

  constructor(): void {
    super();
    this.state = {
      isLoading: false,
      username: '',
      password: '',
      usernameErrorText: '',
      passwordErrorText: '',
    };
  }

  /**
   * Updates the input value in local state after the value in the text field
   *    is changed.  The error text for the associated input is cleared.
   * @param {Event} event Event associated with the input.
   * @param {string} newValue New value of the input.
   */
  handleInputChange = (
    event: Event & { currentTarget: HTMLInputElement },
    newValue: string,
  ): void => {
    const fieldName = event.currentTarget.name;
    const errorTextFieldName = `${fieldName}ErrorText`;
    this.setState({
      [fieldName]: newValue,
      [errorTextFieldName]: '',
    });
  };

  /**
   * Attempts to login to the application if the user presses the Enter key
   *    when focused on the password text field or login button.
   * @param {Event} event Event associated with the focused control.
   */
  handleKeyPress = (
    event: Event & { currentTarget: HTMLInputElement | HTMLButtonElement},
  ): void => {
    const controlName = event.currentTarget.name;
    const { key } = (event: Object);
    if (key === 'Enter') {
      if (controlName === 'password' || controlName === 'login') {
        this.handleLoginButtonTouchTap(event);
      }
    }
  };

  /**
   * Checks the values of the username and password text fields to ensure
   *    values are present.  If either field is empty, error text is
   *    displayed under the text field and return false.
   * @returns {boolean} False is both fields aren't valid.
   */
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

  /**
   * Populates state with Settings, Leads, and User entities and redirects to
   *    default page.
   */
  hydrateStateAndLogin = (): void => {
    this.setState({ isLoading: true });
    this.props.getAllSettings()
      .then(this.props.getAllUsers)
      .then(this.props.getAllLeads)
      .then(() => {
        this.setState({ isLoading: false });
        browserHistory.push('/leads');
      });
  };

  /**
   * Attempts to log the user in when the Login button is pressed.  If the
   *    login information was valid, the state is populated with Setting and
   *    User entities.  If invalid, the user is informed of any errors.
   */
  handleLoginButtonTouchTap = (): void => {
    // Ensure the user entered values for the username and password.
    const entriesValid = this.validateEntries();
    if (entriesValid) {
      const { username, password } = this.state;
      const loginFn = this.props.login;
      loginFn(username, password)
        .then(() => {
          this.hydrateStateAndLogin();
        })
        .catch(() => {
          this.setState({ passwordErrorText: 'Incorrect password' });
        });
    }
  };

  render(): React.Element<*> {
    const {
      isLoading,
      usernameErrorText,
      passwordErrorText,
    } = this.state;

    if (isLoading) {
      return (<ProgressIndicator />);
    }

    // FUTURE: Add Forgot Password button.
    const forgotPasswordButton = (
      <FlatButton
        label="Forgot Password?"
        name="forgot-password"
        style={{
          marginTop: 24,
          width: '100%',
        }}
      />
    );

    const formStyle = { marginBottom: 56 };

    return (
      <glamorous.Div
        display="flex"
        flexFlow="none"
        justifyContent="center"
      >
        <Paper
          style={{
            display: 'block',
            marginTop: 56,
            maxWidth: 1200,
            padding: 32,
            width: 350,
          }}
        >
          <glamorous.Div textAlign="center">
            <Logo
              height={64}
              width={64}
            />
          </glamorous.Div>
          <form style={formStyle}>
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
            {/* {forgotPasswordButton} */}
          </form>
        </Paper>
      </glamorous.Div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
