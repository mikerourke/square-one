/* @flow */

/* External dependencies */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/* Internal dependencies */
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';

/**
 * Header toolbar on the Manage Leads page.
 * @param {Function} handleTouchTap Action to perform when a button on the
 *      toolbar is pressed.
 * @param {string} headerText Text to display in the header.
 * @param {string} subheaderText Text to display in the subheader.
 */
const PageHeaderToolbar = ({
    handleTouchTap,
    headerText,
    subheaderText,
}: {
    handleTouchTap: (event: Event, actionName: string) => void,
    headerText: string,
    subheaderText: string,
}): React.Element<*> => (
    <PageHeader
        actionButtonRight={
            (<RaisedButton
                label="Save"
                onTouchTap={
                    (event: Event) => handleTouchTap(event, 'save')
                }
            />)
        }
        titleLeft={
            (<PageHeaderTitle
                backArrowTooltip="Return to Leads"
                handleBackArrowTouchTap={
                    (event: Event) => handleTouchTap(event, 'back')
                }
                headerText={headerText}
                subheaderText={subheaderText}
                titleIconName="person_outline"
            />)
        }
    />
);

export default PageHeaderToolbar;
