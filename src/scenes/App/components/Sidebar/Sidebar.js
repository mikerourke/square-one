import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { 
    NavigationClose, 
    SocialPeople, 
    ActionSettings 
} from 'material-ui/svg-icons';

const Sidebar = ({open, onToggleDrawer, iconStyle}) => (
    <div>
        <Drawer 
            open={open}
            onRequestChange={onToggleDrawer}>
            <AppBar
                iconElementLeft={<NavigationClose style={iconStyle} />}
                onLeftIconButtonTouchTap={onToggleDrawer}
            />
            <Menu>
                <MenuItem 
                    primaryText="Leads" 
                    leftIcon={<SocialPeople />} 
                    onTouchTap={onToggleDrawer}
                />
                <MenuItem 
                    primaryText="Settings" 
                    leftIcon={<ActionSettings />}
                    onTouchTap={onToggleDrawer}
                />
            </Menu>
        </Drawer>
    </div>
);

Sidebar.propTypes = {
    open: PropTypes.bool,
    onToggleDrawer: PropTypes.func,
    iconStyle: PropTypes.object
};

export default Sidebar;