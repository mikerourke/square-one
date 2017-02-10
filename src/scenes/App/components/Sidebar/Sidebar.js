import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Logo from 'components/Logo';
import MenuItemIcon from 'components/MenuItemIcon';
import Header from './Header';
import HeaderDetail from './HeaderDetail';
import HeaderIcon from './HeaderIcon';

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
            <List>
                <Subheader>Enterprise</Subheader>
                <ListItem
                    id="enterprise:leads"
                    primaryText="Leads"
                    onTouchTap={handleTouchTap}
                    leftIcon={
                        <MenuItemIcon className="material-icons">
                            recent_actors
                        </MenuItemIcon>
                    }
                />
                <Divider />
                <Subheader>Settings</Subheader>
                <ListItem
                    id="settings:general"
                    primaryText="General"
                    onTouchTap={handleTouchTap}
                    leftIcon={
                        <MenuItemIcon className="material-icons">
                            settings
                        </MenuItemIcon>
                    }
                />
                <ListItem
                    id="settings:customize"
                    primaryText="Customize"
                    onTouchTap={handleTouchTap}
                    leftIcon={
                        <MenuItemIcon className="material-icons">
                            create
                        </MenuItemIcon>
                    }
                />
                <ListItem
                    id="settings:lists"
                    primaryText="Lists"
                    onTouchTap={handleTouchTap}
                    leftIcon={
                        <MenuItemIcon className="material-icons">
                            format_list_bulleted
                        </MenuItemIcon>
                    }
                />
            </List>
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
