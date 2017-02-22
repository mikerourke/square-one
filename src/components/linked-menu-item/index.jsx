// @flow

/* External dependencies */
import React from 'react';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import { MenuItem } from 'material-ui/Menu';

/**
 * Menu item in the sidebar linked to a route.
 */
const LinkedMenuItem = ({
    linkTo,
    iconName,
    ...props
}: {
    linkTo: string,
    iconName: string,
}): React.Element<*> => (
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

export default LinkedMenuItem;
