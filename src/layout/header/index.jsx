/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

/*
 * Internal dependencies
 */
import { palette } from 'style/mui';

const Header = ({
    handleToggle,
}) => (
    <AppBar
        iconElementRight={
            <IconButton
                iconClassName="material-icons"
                iconStyle={{ color: palette.primary1Color }}
            >
                account_circle
            </IconButton>
        }
        onLeftIconButtonTouchTap={handleToggle}
        style={{
            position: 'fixed',
            top: 0,
        }}
    />
);

Header.propTypes = {
    handleToggle: PropTypes.func.isRequired,
};

export default Header;
