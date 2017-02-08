import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
    box-shadow: none;
`;

const Header = ({
    handleToggle,
}) => (
    <StyledAppBar
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
