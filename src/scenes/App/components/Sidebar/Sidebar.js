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

const Sidebar = ({open, handleToggle, iconStyle}) => (
    <div>
        <Drawer 
            open={open}
            onRequestChange={handleToggle}>
            <AppBar
                iconElementLeft={<NavigationClose style={iconStyle} />}
                onLeftIconButtonTouchTap={handleToggle}
            />
            <Menu>
                <MenuItem 
                    primaryText="Leads" 
                    leftIcon={<SocialPeople />} 
                    onTouchTap={handleToggle}
                />
                <MenuItem 
                    primaryText="Settings" 
                    leftIcon={<ActionSettings />}
                    onTouchTap={handleToggle}
                />
            </Menu>
        </Drawer>
    </div>
);

Sidebar.propTypes = {
    open: PropTypes.bool,
    handleToggle: PropTypes.func,
    iconStyle: PropTypes.object
};

export default Sidebar;