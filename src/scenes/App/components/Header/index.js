import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import MaterialButton from 'components/MaterialButton';

const Header = (
    {
        handleToggle,
    }) => (
        <AppBar
            iconElementRight={
                <MaterialButton
                    iconName="account_circle"
                    color="white"
                />
            }
            onLeftIconButtonTouchTap={handleToggle}
        />
);

Header.propTypes = {
    handleToggle: PropTypes.func.isRequired,
};

export default Header;
