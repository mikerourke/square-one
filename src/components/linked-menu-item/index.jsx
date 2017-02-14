/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import { MenuItem } from 'material-ui/Menu';

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
