import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import globalStyles from 'scenes/styles';

const styles = Object.assign({}, globalStyles, {
    appBar: {
        boxShadow: 'none',
    },
});

const Header = ({
    handleToggle,
}) => (
    <AppBar
        style={styles.appBar}
        iconElementRight={
            <IconButton
                iconClassName="material-icons"
                iconStyle={styles.iconButton}
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
