// @flow

/* External dependencies */
import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/* Internal dependencies */
import Lead from 'state/leads/model';
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';

const PageHeaderToolbar = ({
    lead,
    handleBackTouchTap,
    handleSaveTouchTap,
}: {
    lead: Lead,
    handleBackTouchTap: (event: Event) => void,
    handleSaveTouchTap: (event: Event) => void,
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
                headerText={lead.leadName}
                subheaderText={lead.status}
                titleIconName="account_circle"
            />)
        }
    />
);

export default PageHeaderToolbar;
