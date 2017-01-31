import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import styles from 'scenes/styles';

const Sidebar = (
    {
        open,
        handleTouchTap,
        handleToggle,
    }) => (
        <div>
            <Drawer
                open={open}
                docked={false}
                onRequestChange={handleToggle}
            >
                <List>
                    <ListItem
                        primaryText="Leads"
                        onTouchTap={handleTouchTap}
                        leftIcon={
                            <FontIcon
                                className="material-icons"
                                style={styles.menuItemIcon}
                            >
                                recent_actors
                            </FontIcon>
                        }
                    />
                    <ListItem
                        primaryText="Settings"
                        onTouchTap={handleTouchTap}
                        leftIcon={
                            <FontIcon
                                className="material-icons"
                                style={styles.menuItemIcon}
                            >
                                settings
                            </FontIcon>
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
};

Sidebar.defaultProps = {
    open: false,
};

export default Sidebar;
