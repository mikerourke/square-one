import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
    appBarIcon: {
        color: 'white',
        cursor: 'pointer',
        width: '24px',
        height: '48px',
        padding: '0 8px',
    },
    menuItemIcon: {
        marginRight: '24px',
    },
};

const Sidebar = (
    {
        open,
        handleToggle,
    }) => (
        <div>
            <Drawer
                open={open}
                onRequestChange={handleToggle}
            >
                <AppBar
                    iconElementLeft={
                        <FontIcon
                            className="material-icons"
                            style={style.appBarIcon}
                        >
                            close
                        </FontIcon>
                        }
                    onLeftIconButtonTouchTap={handleToggle}
                />
                <Menu>
                    <MenuItem
                        primaryText="Leads"
                        leftIcon={
                            <FontIcon
                                className="material-icons"
                                style={style.menuItemIcon}
                            >
                                settings
                            </FontIcon>
                        }
                    />
                    <MenuItem
                        primaryText="Settings"
                        leftIcon={
                            <FontIcon
                                className="material-icons"
                                style={style.menuItemIcon}
                            >
                                settings
                            </FontIcon>
                        }
                    />
                </Menu>
            </Drawer>
        </div>
);

Sidebar.propTypes = {
    open: PropTypes.bool,
    handleToggle: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
    open: false,
};

export default Sidebar;
