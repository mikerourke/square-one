/* @flow */

/* External dependencies */
import React from 'react';

/* Internal dependencies */
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';

/**
 * Header toolbar on the Manage Leads page.
 * @param {Function} handleBackArrowTouchTap Action to perform when the back
 *      arrow button is pressed.
 * @param {string} headerText Text to display in the header.
 * @param {string} subheaderText Text to display in the subheader.
 */
const PageHeaderToolbar = ({
    handleBackArrowTouchTap,
    headerText,
    subheaderText,
}: {
    handleBackArrowTouchTap: () => void,
    headerText: string,
    subheaderText: string,
}): React.Element<*> => (
    <PageHeader
        titleLeft={
            (<PageHeaderTitle
                backArrowTooltip="Return to Leads"
                handleBackArrowTouchTap={handleBackArrowTouchTap}
                headerText={headerText}
                subheaderText={subheaderText}
                titleIconName="person_outline"
            />)
        }
    />
);

export default PageHeaderToolbar;
