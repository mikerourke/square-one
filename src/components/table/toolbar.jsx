/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {
    Toolbar,
    ToolbarGroup,
} from 'material-ui/Toolbar';

/*
 * Internal dependencies
 */
import { palette } from 'style/mui';
import getRgbFromHex from 'lib/rgb-to-hex';

/**
 * Sets the color and transparency of the IconButton inline.
 * @param {number} [transparency=1] Transparency value of the icon.
 * @returns {Object} Inline style for the column.
 */
const getInlineStyle = (transparency = 1) => {
    const { r, g, b } = getRgbFromHex(palette.primary1Color);
    return {
        color: `rgba(${r},${g},${b},${transparency})`,
    };
};

/**
 * Toolbar in the table header for performing searching and filtering
 *      functions.
 * @param {Function} handleFilterMenuChange Action to perform when option is
 *      selected.
 * @param {Function} handleSearchBoxChange Action to perform when the value of
 *      the Search Box is changed.
 * @param {Object[]} filterSelections Filter options that populate the dropdown.
 * @constructor
 */
const TableToolbar = ({
    handleFilterMenuChange,
    handleSearchBoxChange,
    filterSelections,
}) => (
    <Toolbar
        className="square1-toolbar"
        style={{ display: 'block' }}
    >
        <ToolbarGroup
            id="search-box"
        >
            <IconButton
                iconClassName="material-icons"
                iconStyle={getInlineStyle()}
            >
                search
            </IconButton>
            <TextField
                fullWidth={true}
                hintText="Search"
                hintStyle={getInlineStyle(0.5)}
                inputStyle={getInlineStyle()}
                onChange={handleSearchBoxChange}
            />
            <IconMenu
                iconButtonElement={
                    <IconButton
                        iconClassName="material-icons"
                        iconStyle={{ color: palette.primary1Color }}
                    >
                        filter_list
                    </IconButton>
                }
                onChange={handleFilterMenuChange}
            >
                {filterSelections.map(selection => (
                    <MenuItem
                        key={selection.id}
                        value={selection.value}
                        primaryText={selection.value}
                    />
                ))}
            </IconMenu>
        </ToolbarGroup>
    </Toolbar>
);

TableToolbar.propTypes = {
    handleFilterMenuChange: PropTypes.func.isRequired,
    handleSearchBoxChange: PropTypes.func.isRequired,
    filterSelections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableToolbar;
