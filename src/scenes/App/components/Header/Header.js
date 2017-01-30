import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import styles from 'scenes/styles';

const Header = (
    {
        handleToggle,
    }) => (
        <AppBar
            iconElementRight={
                <IconButton
                    iconStyle={styles.iconButton}
                    iconClassName="material-icons"
                >
                    account_circle
                </IconButton>
            }
            onLeftIconButtonTouchTap={handleToggle}
        />
);

Header.propTypes = {
    handleToggle: PropTypes.func.isRequired,
};

export default Header;
