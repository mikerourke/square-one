import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Logo from 'components/Logo';
import globalStyles from 'scenes/styles';

const headerTextColor = globalStyles.palette.alternateTextColor;
const styles = Object.assign({}, globalStyles, {
    header: {
        backgroundColor: globalStyles.palette.accent1Color,
        color: headerTextColor,
        height: '144px',
        paddingLeft: '24px',
    },
    headerIcon: {
        color: headerTextColor,
        marginTop: '24px',
        fontSize: '56px',
    },
    headerDetail: {
        marginTop: '12px',
        fontSize: '14px',
    },
});

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
            <div style={styles.header}>
                <FontIcon
                    className="material-icons"
                    style={styles.headerIcon}
                >
                    face
                </FontIcon>
                <div style={styles.headerDetail}>
                    {userEmail}
                </div>
            </div>
            <List>
                <Subheader>Enterprise</Subheader>
                <ListItem
                    id="enterprise:leads"
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
                <Divider />
                <Subheader>Settings</Subheader>
                <ListItem
                    id="settings:general"
                    primaryText="General"
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
                <ListItem
                    id="settings:customize"
                    primaryText="Customize"
                    onTouchTap={handleTouchTap}
                    leftIcon={
                        <FontIcon
                            className="material-icons"
                            style={styles.menuItemIcon}
                        >
                            create
                        </FontIcon>
                    }
                />
                <ListItem
                    id="settings:lists"
                    primaryText="Lists"
                    onTouchTap={handleTouchTap}
                    leftIcon={
                        <FontIcon
                            className="material-icons"
                            style={styles.menuItemIcon}
                        >
                            format_list_bulleted
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
    userEmail: PropTypes.string,
};

Sidebar.defaultProps = {
    open: false,
    userEmail: 'What up, dawg?',
};

export default Sidebar;
