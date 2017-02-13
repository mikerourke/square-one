import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import AppBar from './components/AppBar';

const Header = ({
    handleToggle,
}) => (
    <AppBar
        iconElementRight={
            <IconButton iconClassName="material-icons">
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
