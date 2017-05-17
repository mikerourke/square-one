/* @flow */

/* External dependencies */
import React from 'react';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import { MenuItem } from 'material-ui/Menu';

/**
 * Menu item in the sidebar linked to a route.
 * @param {string} iconName Name of the icon to display next to the text.
 * @param {string} linkTo Path to component associated with the menu item.
 * @param {...Object} props Additional props associated with the component.
 */
const LinkedMenuItem = ({
  iconName,
  linkTo,
  ...props
}: {
  iconName: string,
  linkTo: string,
}): React.Element<*> => (
  <Link
    style={{ textDecoration: 'none' }}
    to={linkTo}
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
