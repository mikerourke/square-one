/* @flow */

/* External dependencies */
import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';
import getRgbFromHex from 'lib/rgb-to-hex';

const getMenuIconStyle = (disabled?: ?boolean): Object => {
    const { r, g, b } = getRgbFromHex(primary1Color);
    const transparency = disabled ? 0.5 : 1;
    return {
        color: `rgba(${r},${g},${b},${transparency})`,
    };
};

/**
 * Dropdown menu with icon button.
 * @param {boolean} [disabled] Indicates if the menu button is disabled.
 * @param {Function} [handleAddTouchTap] Action to perform when the Add
 *      button is pressed at the bottom of the list (if present).
 * @param {Function} handleItemTouchTap Action to perform when an item is
 *      selected from the dropdown menu.
 * @param {boolean} hasAddButton Indicates if an add button should be present
 *      at the bottom of the list of menu items.
 * @param {string} [itemIconName] Name of the icon to show next to each menu
 *      item.
 * @param {string} menuIconName Name of the icon to use for the menu button.
 * @param {Array} selections Array of items for the dropdown.
 * @param {Object} props Other props associated with the menu.
 */
const IconDropdown = ({
    disabled = false,
    handleAddTouchTap = () => {},
    handleItemTouchTap,
    hasAddButton,
    itemIconName,
    menuIconName,
    selections,
    ...props
}: {
    disabled?: boolean,
    handleAddTouchTap?: (event: Event) => void,
    handleItemTouchTap: (event: Event, child: Object) => void,
    hasAddButton: boolean,
    itemIconName?: ?string,
    menuIconName: string,
    selections: Array<string>,
}): React.Element<*> => (
    <IconMenu
        iconButtonElement={
            <IconButton
                disabled={disabled}
                iconClassName="material-icons"
                iconStyle={getMenuIconStyle(disabled)}
            >
                {menuIconName}
            </IconButton>
        }
        onItemTouchTap={handleItemTouchTap}
        {...props}
    >
        {selections.map(selection => (
            <MenuItem
                innerDivStyle={{ padding: '0 0 0 48px' }}
                key={selection}
                leftIcon={itemIconName && (
                    <FontIcon className="material-icons">
                        {itemIconName}
                    </FontIcon>
                )}
                primaryText={selection}
                value={selection}
            />
        ))}
        {hasAddButton && (
            <MenuItem
                innerDivStyle={{ padding: '0 0 0 48px' }}
                key={999}
                leftIcon={(
                    <FontIcon className="material-icons">
                        add_circle_outline
                    </FontIcon>
                )}
                onTouchTap={handleAddTouchTap}
                primaryText="Add New"
                value="Add New"
            />
        )}
    </IconMenu>
);

export default IconDropdown;
