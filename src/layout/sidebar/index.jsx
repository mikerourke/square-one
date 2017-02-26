/* @flow */

/* External dependencies */
import React from 'react';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { Menu } from 'material-ui/Menu';

/* Internal dependencies */
import LinkedMenuItem from 'components/linked-menu-item';
import SidebarHeader from './sidebar-header';

/**
 * Sidebar drawer in the application layout.
 */
const Sidebar = ({
    open,
    handleToggle,
    userEmail = '',
}: {
    open?: boolean,
    handleToggle: () => void,
    userEmail?: string,
}): React.Element<*> => (
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

Sidebar.defaultProps = {
    open: false,
    userEmail: 'Test',
};

export default Sidebar;
