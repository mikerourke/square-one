/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

/**
 * Dropdown menu containing filters to apply to page data.
 * @param {string} iconColor Color of the filter icon.
 * @param {Object[]} selections Filter options that populate the dropdown.
 * @constructor
 */
const FilterMenu = ({
    iconColor,
    selections,
}) => (
    <IconMenu
        iconButtonElement={
            <IconButton
                iconClassName="material-icons"
                iconStyle={{ color: iconColor }}
            >
                filter_list
            </IconButton>
        }
    >
        {selections.map(selection => (
            <MenuItem
                key={selection.id}
                value={selection.value}
                primaryText={selection.value}
            />
        ))}
    </IconMenu>
);

FilterMenu.propTypes = {
    iconColor: PropTypes.string.isRequired,
    selections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FilterMenu;
