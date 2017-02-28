/* @flow */

/* External dependencies */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/* Internal dependencies */
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';

const PageHeaderToolbar = ({
    handleBackTouchTap,
    handleSaveTouchTap,
    headerText,
    subheaderText,
}: {
    handleBackTouchTap: (event: Event) => void,
    handleSaveTouchTap: (event: Event) => void,
    headerText: string,
    subheaderText: string,
}): React.Element<*> => (
    <PageHeader
        actionButtonRight={
            (<RaisedButton
                label="Save"
                onTouchTap={handleSaveTouchTap}
            />)
        }
        titleLeft={
            (<PageHeaderTitle
                backArrowTooltip="Return to Leads"
                handleBackArrowTouchTap={handleBackTouchTap}
                headerText={headerText}
                subheaderText={subheaderText}
                titleIconName="person_outline"
            />)
        }
    />
);

export default PageHeaderToolbar;
