/* @flow */

/* External dependencies */
import React from 'react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';
import getRgbFromHex from 'lib/rgb-to-hex';

/**
 * Returns a style object with the color for the IconMenu's icon based on
 *    whether it is currently disabled.
 * @param {boolean} disabled Indicates if the control is disabled.
 * @returns {Object}
 */
const getMenuIconStyle = (disabled?: ?boolean): Object => {
  const { r, g, b } = getRgbFromHex(primary1Color);
  const transparency = disabled ? 0.5 : 1;
  return {
    color: `rgba(${r},${g},${b},${transparency})`,
  };
};

/**
 * Dropdown menu with icon button.
 * @param {Function} handleItemTouchTap Action to perform when an item is
 *    selected from the dropdown menu.
 * @param {boolean} hasAddButton Indicates if an add button should be present
 *    at the bottom of the list of menu items.
 * @param {string} menuIconName Name of the icon to use for the menu button.
 * @param {Array} selections Array of items for the dropdown.
 * @param {Function} [handleAddTouchTap] Action to perform when the Add
 *    button is pressed at the bottom of the list (if present).
 * @param {boolean} [disabled=false] Indicates if the menu button is disabled.
 * @param {string} [subheaderText] Optional text for subheader.
 * @param {Object} props Other props associated with the menu.
 */
const IconDropdown = ({
  handleItemTouchTap,
  hasAddButton,
  menuIconName,
  selections,
  handleAddTouchTap = () => {},
  disabled = false,
  subheaderText,
  ...props
}: {
  handleItemTouchTap: (event: Event, child: Object) => void,
  hasAddButton: boolean,
  menuIconName: string,
  selections: Array<string>,
  handleAddTouchTap?: (event: Event) => void,
  disabled?: boolean,
  subheaderText?: ?string,
}): React.Element<*> => (
  <IconMenu
    iconButtonElement={(
      <IconButton
        disabled={disabled}
        iconClassName="material-icons"
        iconStyle={getMenuIconStyle(disabled)}
      >
        {menuIconName}
      </IconButton>
    )}
    onItemTouchTap={handleItemTouchTap}
    {...props}
  >
    {subheaderText && <Subheader>{subheaderText}</Subheader>}
    {selections.map(selection => (
      <MenuItem
        key={selection}
        primaryText={selection}
        value={selection}
      />
    ))}
    {hasAddButton && (
      <div>
        <Divider />
        <Subheader>Actions</Subheader>
        <MenuItem
          key={999}
          onTouchTap={handleAddTouchTap}
          primaryText="Add New"
          value="Add New"
        />
      </div>
    )}
  </IconMenu>
);

export default IconDropdown;
