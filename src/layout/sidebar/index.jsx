import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { Menu } from 'material-ui/Menu';
import LinkedMenuItem from 'components/linked-menu-item';
import Header from './header';

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
            <Header userEmail={userEmail} />
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
