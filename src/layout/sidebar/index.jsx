/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { Menu } from 'material-ui/Menu';

/*
 * Internal dependencies
 */
import LinkedMenuItem from 'components/linked-menu-item';
import SidebarHeader from './sidebar-header';

/**
 * Sidebar drawer in the application layout.
 * @param {boolean} [open=false] Indicates if the drawer is open.
 * @param {Function} handleToggle Handler for when the drawer is toggled.
 * @param {string} [userEmail=""] Email address of the logged in user.
 * @constructor
 */
const Sidebar = ({
    open,
    handleToggle,
    userEmail,
}) => (
    <div>
        <Drawer
            open={open}
            docked={false}
            onRequestChange={handleToggle}
        >
            <SidebarHeader userEmail={userEmail} />
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
    handleToggle: PropTypes.func.isRequired,
    userEmail: PropTypes.string,
};

Sidebar.defaultProps = {
    open: false,
    userEmail: '',
};

export default Sidebar;
