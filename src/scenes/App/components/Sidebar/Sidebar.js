import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import styles from 'scenes/styles';

const Sidebar = (
    {
        open,
        handleToggle,
    }) => (
        <div>
            <Drawer
                open={open}
                docked={false}
                onRequestChange={handleToggle}
            >
                <Menu>
                    <MenuItem
                        primaryText="Leads"
                        leftIcon={
                            <FontIcon
                                className="material-icons"
                                style={styles.menuItemIcon}
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
                                style={styles.menuItemIcon}
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
