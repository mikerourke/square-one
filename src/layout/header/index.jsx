/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

/* Internal dependencies */
import { primary1Color, primary2Color } from 'style/mui/palette';
import { logout } from 'state/session/actions';
import Session from 'state/session/model';

/* Types */
type Props = {
    handleToggle: () => Promise<*>,
    logout: (username: string) => Promise<*>,
    session: Session,
};

type State = {
    popoverOpen: boolean,
    popoverAnchorEl?: EventTarget,
};

/**
 * Styled container for the menu header items.
 */
const MenuHeaderContainer = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
`;

/**
 * Styled component within the menu header container.
 */
const MenuHeaderItem = styled.div`
    flex: 1 0 auto;
    font-size: 14px;
    padding: 4px 16px;
    width: 100%;
`;

const mapStateToProps = state => ({
    session: state.get('session'),
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    logout: username => dispatch(logout(username)),
});

/**
 * Header AppBar element for the application layout.
 * @param {Function} handleToggle Action to perform when the hamburger menu
 *      button is pressed.
 */
export class Header extends Component<*, Props, State> {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            popoverOpen: false,
        };
    }

    handleUserMenuButtonTouchTap = (event: Event & {
        currentTarget: HTMLButtonElement }): void => {
        event.preventDefault();
        this.setState({
            popoverOpen: true,
            popoverAnchorEl: event.currentTarget,
        });
    };

    handleUserMenuItemTouchTap = (event: Event, menuItem: Object): void => {
        const { session } = this.props;
        const logoutFn = this.props.logout;
        const { props: { value } } = menuItem;
        switch (value) {
            case 'refresh':
                // TODO: Add code to handle Refresh.
                break;

            case 'bug':
                // TODO: Add code to handle Report a bug.
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

    handlePopoverRequestClose = (): void => {
        this.setState({ popoverOpen: false });
    };

    render() {
        const { handleToggle, session } = this.props;
        const { popoverOpen, popoverAnchorEl } = this.state;

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
                    <Menu onItemTouchTap={this.handleUserMenuItemTouchTap}>
                        <MenuHeaderContainer>
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
                        </MenuHeaderContainer>
                        <Divider />
                        <MenuItem value="refresh" primaryText="Refresh" />
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
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
