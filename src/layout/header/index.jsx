/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import glamorous from 'glamorous';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

/* Internal dependencies */
import { primary1Color, primary2Color } from 'style/mui/palette';
import { toggleGlobalSnackbar } from 'state/gui/actions';
import { logout } from 'state/session/actions';
import Session from 'state/session/model';
import ReportBugDialog from 'components/report-bug-dialog';

/* Types */
import type { Bug, NoticeType } from 'lib/types';

type Props = {
  handleToggle: () => Promise<*>,
  logout: (username: string) => Promise<*>,
  session: Session,
  toggleGlobalSnackbar: (message: string, noticeType: NoticeType) => void,
};

type State = {
  bug: Bug,
  bugDialogOpen: boolean,
  popoverAnchorEl?: EventTarget,
  popoverOpen: boolean,
};

const mapStateToProps = state => ({
  session: state.get('session'),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  logout: username => dispatch(logout(username)),
  toggleGlobalSnackbar: (message, noticeType) =>
    dispatch(toggleGlobalSnackbar(message, noticeType)),
});

/**
 * Header AppBar element for the application layout.
 * @param {Function} handleToggle Action to perform when the hamburger menu
 *    button is pressed.
 */
export class Header extends Component<*, Props, State> {
  props: Props;
  state: State;

  constructor(props: Props): void {
    super(props);
    this.state = {
      bug: {},
      bugDialogOpen: false,
      popoverOpen: false,
    };
  }

  /**
   * Show the popover when the user account button is pressed.
   * @param {Event} event Event associated with the account button.
   */
  handleUserMenuButtonTouchTap = (
    event: Event & { currentTarget: HTMLButtonElement },
  ): void => {
    // Used to prevent ghost click.
    event.preventDefault();
    this.setState({
      popoverAnchorEl: event.currentTarget,
      popoverOpen: true,
    });
  };

  /**
   * Perform an action based on the selected menu item.
   * @param {Event} event Event associated with the menu.
   * @param {Object} menuItem Menu item selected from the popover.
   */
  handleUserMenuItemTouchTap = (
    event: Event,
    menuItem: Object,
  ): void => {
    const { session } = this.props;
    const logoutFn = this.props.logout;
    const { props: { value } } = menuItem;
    switch (value) {
      case 'bug':
        this.setState({
          bugDialogOpen: true,
          popoverOpen: false,
        });
        break;

      case 'settings':
        // TODO: Add code to handle Settings.
        break;

      case 'signout':
        logoutFn(session.username).then(() => {
          browserHistory.push('/login');
        });
        break;

      default:
        break;
    }
  };

  /**
   * Hide the popover menu.
   */
  handlePopoverRequestClose = (): void => {
    this.setState({ popoverOpen: false });
  };

  /**
   * Hides the Report Bug Dialog component when the user presses the Cancel
   *    button.
   */
  handleReportBugDialogCancelTouchTap = (): void => {
    this.setState({ bugDialogOpen: false });
  };

  /**
   * Submits the bug data as a post request to the API.  Regardless of the
   *    outcome, the Promise resolves.
   */
  submitBug = () => new Promise((resolve) => {
    const { bug } = this.state;
    const toggleSnackbarFn = this.props.toggleGlobalSnackbar;
    axios.post('/bugs', bug)
      .then(() => {
        toggleSnackbarFn('Bug submitted', 'success');
        resolve();
      })
      .catch(() => {
        toggleSnackbarFn('Error submitting bug', 'error');
        resolve();
      });
  });

  /**
   * Submits the bug with specified details and hides the Report Bug Dialog
   *    after pressing the Submit button.
   */
  handleReportBugDialogSubmitTouchTap = (): void => {
    this.submitBug().then(() => {
      this.setState({ bugDialogOpen: false });
    });
  };

  /**
   * Updates the local Bug entity in state based on the inputs specified on the
   *    Report Bug Dialog component.
   * @param {Event} event Event associated with the input.
   * @param {string|number} newValue New value of the input.
   */
  handleReportBugDialogInputChange = (
    event: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement },
    newValue: string | number,
  ): void => {
    const { bug } = this.state;
    const fieldName = event.currentTarget.name;
    bug[fieldName] = newValue;
    this.setState({ bug });
  };

  render(): React.Element<*> {
    const { handleToggle, session } = this.props;
    const {
      bug,
      bugDialogOpen,
      popoverAnchorEl,
      popoverOpen,
    } = this.state;

    const MenuHeaderItem = glamorous.div({
      fontSize: 14,
      padding: '4px 0 4px 16px',
      width: 144,
    });

    const userMenu = (
      <div>
        <IconButton
          iconClassName="material-icons"
          iconStyle={{ color: primary1Color }}
          onTouchTap={this.handleUserMenuButtonTouchTap}
        >
          account_circle
        </IconButton>
        <Popover
          open={popoverOpen}
          anchorEl={popoverAnchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handlePopoverRequestClose}
        >
          <Menu
            onItemTouchTap={this.handleUserMenuItemTouchTap}
            style={{ width: 128 }}
          >
            <glamorous.Div
              alignItems="center"
              display="flex"
              flexFlow="row wrap"
              justifyContent="flex-start"
            >
              <MenuHeaderItem style={{ color: primary2Color }}>
                Logged in as
              </MenuHeaderItem>
              <MenuHeaderItem
                style={{
                  color: primary1Color,
                  fontWeight: 'bold',
                }}
              >
                {session.fullName}
              </MenuHeaderItem>
            </glamorous.Div>
            <Divider />
            <MenuItem value="bug" primaryText="Report a bug" />
            <MenuItem value="settings" primaryText="Settings" />
            <Divider />
            <MenuItem value="signout" primaryText="Sign out" />
          </Menu>
        </Popover>
      </div>
    );

    return (
      <AppBar
        iconElementRight={userMenu}
        onLeftIconButtonTouchTap={handleToggle}
        style={{
          position: 'fixed',
          top: 0,
        }}
      >
        <ReportBugDialog
          bug={bug}
          open={bugDialogOpen}
          handleSubmitTouchTap={this.handleReportBugDialogSubmitTouchTap}
          handleCancelTouchTap={this.handleReportBugDialogCancelTouchTap}
          handleInputChange={this.handleReportBugDialogInputChange}
        />
      </AppBar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
