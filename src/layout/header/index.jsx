/* @flow */

/* External dependencies */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';

/**
 * Header AppBar element for the application layout.
 */
const Header = ({
    handleToggle,
}: {
    handleToggle: () => void,
}): React.Element<*> => (
    <AppBar
        iconElementRight={
            <IconButton
                iconClassName="material-icons"
                iconStyle={{ color: primary1Color }}
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

export default Header;
