import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { Menu, MenuItem } from 'material-ui/Menu';
import Subheader from 'material-ui/Subheader';
import Logo from 'components/Logo';
import MenuItemIcon from 'components/MenuItemIcon';
import Header from './components/Header';
import HeaderDetail from './components/HeaderDetail';
import HeaderIcon from './components/HeaderIcon';
import LinkedMenuItem from 'components/LinkedMenuItem';

const Sidebar = ({
    open,
    handleTouchTap,
    handleToggle,
    userEmail,
}) => (
    <div>
        <Drawer
            open={open}
            docked={false}
            onRequestChange={handleToggle}
        >
            <Header>
                <HeaderIcon className="material-icons">
                    face
                </HeaderIcon>
                <HeaderDetail>
                    {userEmail}
                </HeaderDetail>
            </Header>
            <Menu>
                <LinkedMenuItem
                    id="home"
                    linkTo="/"
                    primaryText="Home"
                    iconName="home"
                />
                <Divider />
                <LinkedMenuItem
                    id="leads"
                    linkTo="/leads"
                    primaryText="Leads"
                    iconName="recent_actors"
                />
                <LinkedMenuItem
                    id="reportBuilder"
                    linkTo="/"
                    primaryText="Report Builder"
                    iconName="insert_drive_file"
                />
                <Divider />
                <LinkedMenuItem
                    id="settings"
                    linkTo="/"
                    primaryText="Settings"
                    iconName="settings"
                />
            </Menu>
        </Drawer>
    </div>
);

Sidebar.propTypes = {
    open: PropTypes.bool,
    handleTouchTap: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
    userEmail: PropTypes.string,
};

Sidebar.defaultProps = {
    open: false,
    userEmail: 'What up, dawg?',
};

export default Sidebar;
