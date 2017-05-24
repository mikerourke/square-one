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
 * @param {boolean} open Indicates if the sidebar is visible.
 * @param {Function} handleToggle Action to perform when the hamburger menu
 *    button on the AppBar is pressed.
 * @param {string} fullNameOfUser Name to display in the header of the sidebar.
 */
const Sidebar = ({
  open,
  handleToggle,
  fullNameOfUser = '',
}: {
  open: boolean,
  handleToggle: () => void,
  fullNameOfUser?: string,
}): React.Element<*> => (
  <div>
    <Drawer
      open={open}
      docked={false}
      onRequestChange={handleToggle}
    >
      <SidebarHeader fullNameOfUser={fullNameOfUser} />
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

export default Sidebar;
