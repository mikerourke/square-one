/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

/*
 * Internal dependencies
 */
import { palette } from 'style/mui';

/**
 * Dropdown menu containing filters to apply to page data.
 * @param {Function} handleChange Action to perform when option is selected.
 * @param {Object[]} selections Filter options that populate the dropdown.
 * @constructor
 */
const PageHeaderFilterMenu = ({
    handleChange,
    selections,
}) => (
    <IconMenu
        iconButtonElement={
            <IconButton
                iconClassName="material-icons"
                iconStyle={{ color: palette.alternateTextColor }}
            >
                filter_list
            </IconButton>
        }
        onChange={handleChange}
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

PageHeaderFilterMenu.propTypes = {
    handleChange: PropTypes.func.isRequired,
    selections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PageHeaderFilterMenu;
