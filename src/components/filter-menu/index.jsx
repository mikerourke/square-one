/* @flow */

/* External dependencies */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SvgAdd from 'material-ui/svg-icons/content/add-circle-outline';
import SvgCheck from 'material-ui/svg-icons/toggle/check-box';
import SvgFilterList from 'material-ui/svg-icons/content/filter-list';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';

/* Types */
import type { Selection } from 'lib/types';

/**
 * Dropdown menu for applying filters.
 * @param {Array} [filterSelections=[]] Array of items for the Filter dropdown.
 * @param {Function} [handleFilterMenuChange: () => {}] Action to perform when
 *      an item is selected from the Filter dropdown menu.
 */
const FilterMenu = ({
    filterSelections,
    handleFilterMenuChange,
}: {
    filterSelections: Array<Selection>,
    handleFilterMenuChange: (event: Event, key: string, value: string) => void,
}): React.Element<*> => (
    <IconMenu
        iconButtonElement={
            <IconButton iconStyle={{ color: primary1Color }}>
                <SvgFilterList />
            </IconButton>
        }
        onChange={handleFilterMenuChange}
    >
        {filterSelections.map(selection => (
            <MenuItem
                innerDivStyle={{ padding: '0 0 0 48px' }}
                key={selection.id}
                leftIcon={<SvgCheck />}
                primaryText={selection.value}
                value={selection.value}
            />
        ))}
        <MenuItem
            innerDivStyle={{ padding: '0 0 0 48px' }}
            key={999}
            leftIcon={<SvgAdd />}
            primaryText="Add New"
            value="Add New"
        />
    </IconMenu>
);

export default FilterMenu;
