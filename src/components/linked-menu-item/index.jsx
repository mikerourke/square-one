/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import { MenuItem } from 'material-ui/Menu';

/**
 * Menu item in the sidebar linked to a route.
 * @param {string} linkTo Router link for the component.
 * @param {string} iconName Name of the Material icon.
 * @param {...Object} props Default props on the Menu Item.
 * @constructor
 */
const LinkedMenuItem = ({
    linkTo,
    iconName,
    ...props
}) => (
    <Link
        to={linkTo}
        style={{ textDecoration: 'none' }}
    >
        <MenuItem
            leftIcon={
                <FontIcon
                    className="material-icons"
                    style={{ marginRight: 24 }}
                >
                    {iconName}
                </FontIcon>
            }
            {...props}
        />
    </Link>
);

LinkedMenuItem.propTypes = {
    linkTo: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
};

export default LinkedMenuItem;
