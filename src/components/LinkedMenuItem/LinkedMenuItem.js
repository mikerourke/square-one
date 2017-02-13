import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { MenuItem } from 'material-ui/Menu';
import MenuItemIcon from '../MenuItemIcon';

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const LinkedMenuItem = ({
    id,
    linkTo,
    primaryText,
    iconName,
}) => (
    <StyledLink to={linkTo}>
        <MenuItem
            id={id}
            primaryText={primaryText}
            leftIcon={
                <MenuItemIcon className="material-icons">
                    {iconName}
                </MenuItemIcon>
            }
        />
    </StyledLink>
);

LinkedMenuItem.propTypes = {
    id: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
    primaryText: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
};

export default LinkedMenuItem;
