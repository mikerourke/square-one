/* @flow */

/* External dependencies */
import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';

/* Types */
import type { Selection } from 'lib/types';

/**
 * Dropdown menu for applying filters.
 * @param {Array} [filterSelections=[]] Array of items for the Filter dropdown.
 * @param {Function} handleFilterMenuChange Action to perform when an item is
 *      selected from the Filter dropdown menu.
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
            <IconButton
                iconClassName="material-icons"
                iconStyle={{ color: primary1Color }}
            >
                filter_list
            </IconButton>
        }
        onChange={handleFilterMenuChange}
    >
        {filterSelections.map(selection => (
            <MenuItem
                innerDivStyle={{ padding: '0 0 0 48px' }}
                key={selection.id}
                leftIcon={
                    (<FontIcon
                        iconClassName="material-icons"
                    >
                        check_box
                    </FontIcon>)
                }
                primaryText={selection.value}
                value={selection.value}
            />
        ))}
        <MenuItem
            innerDivStyle={{ padding: '0 0 0 48px' }}
            key={999}
            leftIcon={
                (<FontIcon
                    iconClassName="material-icons"
                >
                    add_circle_outline
                </FontIcon>)
            }
            primaryText="Add New"
            value="Add New"
        />
    </IconMenu>
);

export default FilterMenu;
